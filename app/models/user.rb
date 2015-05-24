class User < ActiveRecord::Base
  belongs_to :location
  has_and_belongs_to_many :songs

  validates :provider, :uid, :email, presence: true
end
