class Location < ActiveRecord::Base
  has_many :users

  def user_count
    users.size
  end

  def song_count
    users.reduce(0) do |acc, u|
      acc + u.song_count
    end
  end
end
