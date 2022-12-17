class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  #  :recoverable, :rememberable, :validatable
  devise :database_authenticatable, :registerable,
  :jwt_authenticatable,
  jwt_revocation_strategy: :JwtDenyList

  validates_presence_of :password, :email
  has_many :events, foreign_key: :organiser_id, dependent: :destroy
  has_many :members
  has_one :wishlist, dependent: :destroy
  has_many :wishes, through: :wishlist
  has_many :gifts
end
