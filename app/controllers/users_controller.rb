class UsersController < ApplicationController
  def spotify
    # Logic for creating user
    sp_user = RSpotify::User.new(auth_hash)
    
    user = User.where(uid: sp_user.id,
                      email: sp_user.email,
                      provider: auth_hash[:provider]).first_or_create

    session[:authenticated] = true
    session[:spotify_hash] = sp_user.to_hash
    session[:user_id] = user.id

    redirect_to root_path
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
