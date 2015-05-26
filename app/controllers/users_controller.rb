class UsersController < ApplicationController
  include ApplicationHelper

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

  def place
    location_id = params[:location]
    unless Location.where(id: location_id).empty?
      current_user.update(location_id: location_id)
      render json: {}, status: 200
    else
      render nothing: true, status: 400
    end
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
