class Gift < ApplicationRecord
  has_many :wishes
  has_many :wishlists, through: :wishes
  validates_presence_of :name
end
