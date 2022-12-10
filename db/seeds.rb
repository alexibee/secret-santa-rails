# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Wish.destroy_all
Gift.destroy_all
Wishlist.destroy_all
Pair.destroy_all
Member.destroy_all
Group.destroy_all
Event.destroy_all
User.destroy_all

names = ['Pablo', 'Henry', 'Oswald', 'Marcus', 'Gene', 'Sophie', 'Andrea', 'Helen', 'Marie', 'Roberta', 'Gregory', 'John', 'Bob', 'Lee', 'Angus', 'Madeleine', 'Elizabeth', 'Patty', 'Sarah', 'Dora']

# ----------------- USERS

users = []
x = 1
names.each do |name|
  user = User.new(email: "#{name}@example.com", password: "secret")
  user.save!
  p "user #{user.id} created"
  users << {name: name, id: user.id}
  x+=1
end

# ------------------ WISHLISTS

wishlists = []

users.each do |user|
  p user['id']
  wishlist = Wishlist.new(name: "#{user[:name]}'s wishlist", user_id: user[:id] )
  wishlist.save!
  p "wishlist #{wishlist.id} created"
  wishlists << wishlist
end

# ------------------ WISHES & GIFTS

gift_names = ['banana', 'coal', 'xmas tree', 'box', 'orange', 'socks', 'makeup', 'flowers', 'hat', 'sweater']
# items = ['slippers', 'cat', 'dog', 'parrot', 'icicle', 'santa costume', 'pat on the back', 'glasses']

gifts = []

gift_names.each do |item|
  gift = Gift.new(name: item)
  gift.save!
  p "gift #{gift.id} created"
  gifts << gift
end

wishlists.each do |list|
  gift = gifts.sample
  wish = Wish.new(wishlist_id: list.id, name: gift.name, gift_id: gift.id)
  p "wish #{wish.id} created"
  wish.save!
end

# -------------------- EVENTS & GROUPS & MEMBERS & PAIRS

i = 1
users[3..6].each do |user|
  event = Event.new(title: "#{user[:name]}'s Event", date: Date.today + rand(10_000), location: "#{user[:name]}'s place", description: 'Cool event, yay!', organiser_id: user[:id] )
  event.save!
  p "event #{event.id} created"
  group = Group.new(event_id: event.id, name: 'Group 1')
  group.save!
  p "group #{group.id} created"
  j = 1
  members = []
  4.times do
    users[i*j-1][:name]
    member = Member.new(group_id: group.id, name:  users[i*j-1][:name], member_nr: "Member#{j}", user_id: users[i*j-1][:id], email: "#{users[i*j-1][:name]}@example.com"  )
    member.save!
    p "member #{member.id} created"
    members << member
    j+=1
  end

  2.times do |k|
    pair1 = Pair.new(receiver_id: members[2*k].id, giver_id: members[2*k+1].id, exclusion: false, group_id: group.id)
    pair2 = Pair.new(receiver_id: members[2*k+1].id, giver_id: members[2*k].id, exclusion: false, group_id: group.id)
    pair1.save!
    p "pair #{pair1.id} created"
    pair2.save!
    p "pair #{pair2.id} created"
  end
  i+=1
end
