class AddAlbumNameToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :album_name, :string
  end
end
