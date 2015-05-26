class AddLargeImageAndSmallImageAndPreviewToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :large_image, :string
    add_column :songs, :small_image, :string
    add_column :songs, :preview, :string
  end
end
