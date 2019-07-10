# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

Userplan.delete_all
Itinerary.delete_all
User.delete_all

usernames = [
  'Emily',
  'Negah',
  'Nelly',
  'Tim',
]

users_collection = []

usernames.each do |name|
  users_collection << User.create(username: name)
end

itineraries = [
  {location: "Chicago", date: "July 14-16"},
  {location: "New York", date: "August 14-16"},
  {location: "Boise", date: "Sept 5-8"}
]

itinerary_collection = []

itineraries.each do |itinerary|
  itinerary_collection << Itinerary.create(location: itinerary[:location], date: itinerary[:date])
end

Userplan.create(user_id: 1, itinerary_id: 1)
Userplan.create(user_id: 1, itinerary_id: 2)
Userplan.create(user_id: 1, itinerary_id: 3)
Userplan.create(user_id: 1, itinerary_id: 2)



Activity.create(name: 'beach', date: Faker::Date.forward(60), times: "8:00- 10:00", user_id: 1, itinerary_id: 1)
Activity.create(name: 'concert', date: Faker::Date.forward(60), times: "8:00- 10:00", user_id: 1, itinerary_id: 2)
Activity.create(name: 'dinner', date: Faker::Date.forward(60), times: "8:00- 10:00", user_id: 1, itinerary_id: 3)
Activity.create(name: 'park', date: Faker::Date.forward(60), times: "8:00- 10:00", user_id: 1, itinerary_id: 4)

reactions =["Great!", "LOVE IT", "BOOO"]

4.times do
  Comment.create(content: reactions[rand(1...3)], user_id: 1, activity_id: rand(1...4))
end
