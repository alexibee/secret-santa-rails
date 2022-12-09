class Api::V1::GroupsController < ApplicationController
  before_action :set_event, only: %i[create]
  before_action :set_group, only: %i[show update destroy]

  def index
    @groups = Group.all

    render json: @groups
  end

  def show
    render json: @group.members
  end

  def create
    params_members = member_params['members']
    ActiveRecord::Base.transaction do
      @group = Group.new(event_id: @event.id)
      @members = params_members.map do |member|
        user_id = nil
        if User.find_by(email: member['email'])
          @user = User.find_by(email: member['email'])
          user_id = @user.id
        end
        @group.members.new(
          name: member['name'],
          member_nr: member['member_nr'],
          user_id: user_id
        )
      end
      if @group.save
        render json: [@group, @members], status: :created
      else
        render json: @group.errors, status: :unprocessable_entity
      end
    end
  end

  def update
    if @group.update(params['group'])
      render json: @group
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @group.destroy
  end

  private

  def set_event
    @event = Event.find(params[:event_id])
  end

  def set_group
    @group = Group.find(params[:id])
  end

  def member_params
    params.permit(
      {members: [:name, :member_nr, :email]}
    )
  end

end
