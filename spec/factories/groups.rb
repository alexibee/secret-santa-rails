FactoryBot.define do
  factory :group do
    name {"#{rand(1..1000000)} group"}
    event
  end
end
