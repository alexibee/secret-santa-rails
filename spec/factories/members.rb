FactoryBot.define do
  factory :member do
    name {"#{rand(1..1000000)} member"}
    member_nr { 1 }
    user
    group
    email {user.email}
  end
end
