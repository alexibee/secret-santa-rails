class Group < ApplicationRecord
  has_many :members, dependent: :destroy
  has_many :pairs, through: :members
  belongs_to :event
end
