class CreateJoinTableLocationSong < ActiveRecord::Migration
  def change
    create_join_table :locations, :songs do |t|
      # t.index [:location_id, :song_id]
      # t.index [:song_id, :location_id]
    end
  end
end
