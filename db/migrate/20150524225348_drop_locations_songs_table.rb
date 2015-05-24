class DropLocationsSongsTable < ActiveRecord::Migration
  def change
    drop_table :locations_songs
  end
end
