FactoryBot.define do
  factory :user do
    email {"#{rand(1..1000000)}@example.com"}
    password {"secret"}
  end
end
