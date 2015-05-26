class Song < ActiveRecord::Base
  has_and_belongs_to_many :users

  def user_count(location=nil)
    return users.size unless location
    users.where(location_id: location).count
  end

  def as_track
    RSpotify::Track.find(sid)
  end
end
