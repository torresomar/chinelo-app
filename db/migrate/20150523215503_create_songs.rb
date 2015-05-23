class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs, id: false do |t|
      t.primary_key :id
      t.string :uri
      t.string :artist
      t.string :name

      t.timestamps null: false
    end
  end
end
