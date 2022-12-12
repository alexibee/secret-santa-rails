class Event < ApplicationRecord
  has_many :groups, dependent: :destroy
  has_many :members, through: :groups, dependent: :destroy
  belongs_to :user, foreign_key: :organiser_id
  has_many :users, through: :members
  validates_presence_of :title, :location, :title, :date
end
