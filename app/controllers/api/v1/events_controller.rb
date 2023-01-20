class Api::V1::EventsController < ApplicationController
  before_action :set_event, only: %i[show update destroy]

  def index
    @org_events = Event.where(organiser_id: current_user.id)

    @part_events = Event.joins(:members).where(members: { user_id: current_user.id })

    render json: {org_events: @org_events, part_events: @part_events}, status: :ok
  end

  def show
    if @event.organiser_id == current_user.id || @event.members.find_by(user_id: current_user.id)
      @members = @event.members
      @member = @members.find_by(user_id: current_user.id)
      if @member
        set_receiver_data
      else
        @receiver = nil
      end
      render json: { event: @event, members: @members, receiver_data: { receiver: @receiver, rec_wishlist: @receivers_gifts } }, status: :ok
    else
      render json: { error: { message: 'Unauthorized' } }, status: :unauthorized
    end
  end

  def create
    ActiveRecord::Base.transaction do
      @event = Event.new(event_params[:event])
      @event.organiser_id = current_user.id
      if @event.save
        create_group_and_members
        render json: @event, status: :created
      else
        render json: @event.errors, status: :unprocessable_entity
      end
    end
  end

  def update
    if @event.update(event_params)
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @event.destroy
  end

  private

  def create_group_and_members
    @group = Group.new(event_id: @event.id)
    @members = event_params[:members].map do |member|
      user_id = nil
      email = member['email'] ? member['email'].downcase : ''
      if User.find_by(email: email)
        @user = User.find_by(email: email)
        user_id = @user.id
      end
      @group.members.new(
        name: member['name'],
        member_nr: member['member_nr'],
        user_id: user_id
      )
    end
    if @group.save
      create_pairs
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  def create_pairs
    event_params[:pairs].each do |pair|
      @giver = @group.members.find_by(member_nr: pair['giver_nr'])
      @receiver = @group.members.find_by(member_nr: pair['receiver_nr'])
      @pair = Pair.new(giver_id: @giver.id, receiver_id: @receiver.id, exclusion: pair['exclusion'])
      if !@pair.save
        render json: @pair.errors, status: :unprocessable_entity
      end
    end
  end

  def set_receiver_data
    @pairs = @member.pairs
    @pair = @pairs.find_by(giver_id: @member.id)
    @receiver = @members.find_by(id: @pair.receiver_id)
    @receivers_wishlist = Wishlist.includes(:wishes).find_by(user_id: @receiver.user_id)
    if @receivers_wishlist
      @receivers_gifts = @receivers_wishlist.wishes
    else
      @receivers_gifts = []
    end
  end

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(
      event: [:title, :description, :location, :date, :lat, :lng],
      members: [ :name, :member_nr, :email ],
      pairs: [:giver_nr, :receiver_nr, :exclusion]
    )
  end
end
