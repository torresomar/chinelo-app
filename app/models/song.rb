class Song < ActiveRecord::Base
  has_and_belongs_to_many :users

  def user_count
    users.size
  end
end
