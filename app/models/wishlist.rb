class Wishlist < ApplicationRecord
  belongs_to :user
  validates :user_id, uniqueness: true
  has_many :wishes, dependent: :destroy
  has_many :gifts, through: :wishes
end
