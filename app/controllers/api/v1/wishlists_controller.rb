class Api::V1::WishlistsController < ApplicationController

  def create
    @wishlist = Wishlist.new(wishlist_params)
    @wishlist.user_id = current_user.id
    if @wishlist.save
      render json: @wishlist, status: :created
    else
      render json: @wishlist.errors, status: :unprocessable_entity
    end
  end

  def show_own
    @wishlist = Wishlist.find_by(user_id: current_user.id)
    if @wishlist
      @gifts = Gift.includes(:wishes).where(wishes: {wishlist_id: @wishlist.id})
      @gift_wishes = @gifts.map do |gift|
        {gift: gift, wish: gift.wishes}
      end
    else
      @wishlist = nil
    end
    render json: [@wishlist, @gift_wishes], status: :ok
  end

  private

  def wishlist_params
    params.require(:wishlist).permit(
      :name
    )
  end
end
