class Api::V1::WishlistsController < ApplicationController
  before_action :set_wishlist, only: %i[show]

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
    @gifts = Gift.includes(:wishes).where(wishes: {wishlist_id: @wishlist.id})
    @gift_wishes = @gifts.map do |gift|
      {gift: gift, wish: gift.wishes}
    end
    @wishes = nil
    # @wishes = Wishlist.includes(:wishes).find_by(user_id: current_user.id)
    # @wishes = Wish.includes(:gift).where(wishlist_id: @wishlist.id)
    # @gifts = Gift.join(:wishes).where(id: :gift_id)
    # @wishes = Gift.includes(:wishes).joins(:wishlist).where()

    render json: [@wishlist, @gift_wishes]
  end

  private

  def wishlist_params
    params.require(:wishlist).permit(
      :name
    )
  end

  def set_wishlist
    @wishlist = Wishlist.find(params[:id])
  end

end
