class AddImageurlToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :imageurl, :string
  end
end
