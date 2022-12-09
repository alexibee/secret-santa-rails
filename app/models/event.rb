class Event < ApplicationRecord
  has_many :groups, dependent: :destroy
  has_many :members, through: :groups, dependent: :destroy
end
