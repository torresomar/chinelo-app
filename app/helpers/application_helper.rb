module ApplicationHelper
  def current_user
    if session[:authenticated]
      User.find(session[:user_id])
    end
  end

  def spotify_user
    if session[:authenticated]
      RSpotify::User.new(session[:spotify_hash])
    end
  end
end
