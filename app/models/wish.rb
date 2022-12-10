class Wish < ApplicationRecord
  belongs_to :wishlist
  belongs_to :gift, optional: true
end
