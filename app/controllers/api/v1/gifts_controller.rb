class Api::V1::GiftsController < ApplicationController
  def create
    @gift = Gift.new(gift_params)
    @gift.user_id = current_user.id
    if @gift.save
      render json: @gift, status: :created
    else
      render json: @gift.errors, status: :unprocessable_entity
    end
  end

  private

  def gift_params
    params.require(:gift).permit(
      :name, :price, :url
    )
  end

end
