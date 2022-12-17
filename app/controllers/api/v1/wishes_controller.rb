class Api::V1::WishesController < ApplicationController
  before_action :set_wishlist, only: %i[create create_from_gift]

  def create
    @wish = Wish.new(wish_params)
    @wish.wishlist_id = @wishlist.id
    if @wish.save
      render json: @wish, status: :created
    else
      render json: @wish.errors, status: :unprocessable_entity
    end
  end

  def create_from_gift
    @wish = Wish.new(wish_params)
    @wish.wishlist_id = @wishlist.id
    if @wish.save
      render json: @wish, status: :created
    else
      render json: @wish.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @wish = Wish.find(params[:id])
    @wish.destroy
  end

  private

  def set_wishlist
    @wishlist = Wishlist.find_by(user_id: current_user.id)
  end

  def wish_params
    params.require(:wish).permit(
      :name, :price, :url
    )
  end
end
