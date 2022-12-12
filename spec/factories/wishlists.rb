FactoryBot.define do
  factory :wishlist do
    name {"#{rand(1..1000000)} wishlist"}
    user
  end
end
