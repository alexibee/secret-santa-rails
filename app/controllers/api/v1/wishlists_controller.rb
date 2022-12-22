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
      @wishes = @wishlist.wishes
    else
      @wishlist = nil
    end
    render json: { wishlist: @wishlist, wishes: @wishes }, status: :ok
  end

  private

  def wishlist_params
    params.require(:wishlist).permit(
      :name
    )
  end
end
