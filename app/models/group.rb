class Group < ApplicationRecord
  has_many :members, dependent: :destroy
  has_many :pairs, dependent: :destroy
  belongs_to :event

end
