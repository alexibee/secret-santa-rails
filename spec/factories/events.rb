FactoryBot.define do
  factory :event do
    title {"#{rand(1..1000000)} event"}
    location {"here"}
    description {"description"}
    date {Date.today + rand(10_000)}
    user
  end
end
