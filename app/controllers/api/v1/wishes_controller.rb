class Api::V1::WishesController < ApplicationController
  def destroy
    @wish = Wish.find(params[:id])
    @wish.destroy
  end
end
