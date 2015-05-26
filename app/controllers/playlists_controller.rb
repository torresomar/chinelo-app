class PlaylistsController < ApplicationController
  include ApplicationHelper

  def create
    if spotify_user
      playlist = spotify_user.create_playlist!('Chinelo-Playlist')
      playlist.add_tracks!(current_user.tracks)
      render json: {}, status: 200
    else
      render nothing: true, status: 401
    end
  end

  def current
    user = current_user
    if user
      render json: user.songs
    else
      render nothing: true, status: 401
    end
  end
end
