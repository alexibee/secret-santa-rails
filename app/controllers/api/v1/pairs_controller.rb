class Api::V1::PairsController < ApplicationController
  before_action :set_group, only: %i[create]
  before_action :set_pair, only: %i[show update destroy]

  def index
    @pairs = Pair.all
    render json: @pairs
  end

  def show
    render json: @pair
  end

  def create
    @pair = Pair.new(pair_params)
    @pair.group_id = @group.id
    if @pair.save
      render json: @pair, status: :created
    else
      render json: @pair.errors, status: :unprocessable_entity
    end
    # ActiveRecord::Base.transaction do
    #   pair_errors = []
    #   @pairs = pair_params['pairs'].map do |pair|
    #     @pair = Pair.new(
    #       giver_id: pair['giver_id'],
    #       receiver_id: pair['receiver_id'],
    #       exclusion: pair['exclusion'],
    #       group_id: @group.id
    #     )
    #     pair_errors.push(@pair.errors) unless @pair.save
    #   end
    #   if !pair_errors.empty?
    #     render json: pair_errors.join, status: :unprocessable_entity
    #   else
    #     render json: @pairs, status: :created
    #   end
    # end
  end

  def update
    if @pair.update(pair_params['pairs'][0])
      render json: @pair
    else
      render json: @pair.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @pair.destroy
  end

  private

  def set_pair
    @pair = Pair.find(params[:id])
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

  def pair_params
    params.require(:pair).permit(
      :giver_id, :receiver_id, :exclusion
    )
  end
end
