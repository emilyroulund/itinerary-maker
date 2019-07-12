class Itinerary < ApplicationRecord
  has_many :userplans, dependent: :delete_all
  has_many :users, through: :userplans
  has_many :activities, dependent: :delete_all

end
