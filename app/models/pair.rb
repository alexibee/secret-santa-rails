class Pair < ApplicationRecord
  belongs_to :receiver, class_name: 'Member'
  belongs_to :giver, class_name: 'Member'
end
