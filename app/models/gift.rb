class Gift < ApplicationRecord
  has_many :wishes, dependent: :destroy
  has_many :wishlists, through: :wishes
end
