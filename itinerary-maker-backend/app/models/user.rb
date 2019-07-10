class User < ApplicationRecord
  has_many :userplans
  has_many :itineraries, through: :userplans
  has_many :activities
  has_many :comments


end
