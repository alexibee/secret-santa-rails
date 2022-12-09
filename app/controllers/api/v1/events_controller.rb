class Api::V1::EventsController < ApplicationController
  before_action :set_event, only: %i[show update destroy]

  def index
    @org_events = Event.where(organiser_id: current_user.id)

    @part_events = Event.joins(:members).where(members: { user_id: current_user.id })

    render json: {org_events: @org_events, part_events: @part_events}
  end

  def show
    @members = @event.members
    @member = @members.find_by(user_id: current_user.id)
    if @member
      @pairs = @member.pairs
      @pair = @pairs.find_by(giver_id: @member.id)
      @receiver = @members.find_by(id: @pair.receiver_id)
      @wishlist = Wishlist.includes(:gifts).find_by(user_id: @receiver.user_id)
      if @wishlist
        @receivers_gifts = @receivers_wishlist.gifts
      else
        @receivers_gifts = []
      end
    else
      @receiver = nil
    end

    render json: [@event, @members, {receiver: @receiver, rec_wishlist: @receivers_gifts}]
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      render json: @event, status: :created
    else
      render json: @event.errors, status: :unprocessable_entity
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

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(
      :title,
      :description,
      :location,
      :date,
      :organiser_id
    )
  end
end
