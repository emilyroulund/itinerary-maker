class Itinerary < ApplicationRecord
  has_many :userplans
  has_many :users, through: :userplans
  has_many :activities

end
 
