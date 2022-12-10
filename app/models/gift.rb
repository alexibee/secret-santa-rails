class Gift < ApplicationRecord
  has_many :wishes
  has_many :wishlists, through: :wishes
end
