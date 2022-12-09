class Api::V1::GiftsController < ApplicationController

  def create
    @wishlist = Wishlist.find_by(user_id: current_user.id)
    @gift = Gift.new(gift_params)
    if @gift.save
      @wish = Wish.new({wishlist_id: @wishlist.id, gift_id: @gift.id})
      if @wish.save
        render json: [@gift, @wish], status: :created
      else
        render json: @wish.errors, status: :unprocessable_entity
      end
    else
      render json: @gift.errors, status: :unprocessable_entity
    end
  end

  private

  def gift_params
    params.require(:gift).permit(
      :name
    )
  end

end
