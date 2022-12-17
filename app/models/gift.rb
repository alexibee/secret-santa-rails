class Gift < ApplicationRecord
  has_many :wishes
  has_many :wishlists, through: :wishes
  belongs_to :user
  validates_presence_of :name
end
