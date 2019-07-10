class CreateUserplans < ActiveRecord::Migration[5.2]
  def change
    create_table :userplans do |t|
      t.references :itinerary, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
