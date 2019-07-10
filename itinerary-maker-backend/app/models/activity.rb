class Activity < ApplicationRecord
  belongs_to :itinerary
  belongs_to :user
  has_many :comments
end
