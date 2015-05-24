class UsersController < ApplicationController
  def spotify
    # Logic for creating user
    spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
    spotify_user.email

    redirect_to root_path
  end

end
