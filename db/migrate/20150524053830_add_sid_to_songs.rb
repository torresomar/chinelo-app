class AddSidToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :sid, :string
  end
end
