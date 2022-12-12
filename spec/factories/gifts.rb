FactoryBot.define do
  factory :gift do
    name {"#{rand(1..1000000)} gift"}
    wish
  end
end
