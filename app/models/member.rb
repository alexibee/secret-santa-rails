class Member < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :group
  has_many :pairs, class_name: 'Pair', foreign_key: :receiver_id, dependent: :destroy
  has_many :pairs, class_name: 'Pair', foreign_key: :giver_id, dependent: :destroy
end
