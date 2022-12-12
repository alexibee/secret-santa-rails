FactoryBot.define do
  factory :wish do
    name {"#{rand(1..1000000)} wishlist"}
    wishlist
    gift
  end
end
