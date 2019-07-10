class CreateActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :activities do |t|
      t.string :name
      t.string :date
      t.string :times
      t.string :link
      t.string :image
      t.references :itinerary, foreign_key: true
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
