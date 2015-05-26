class SongsController < ApplicationController
  include ApplicationHelper
  respond_to :json

  def index
    @songs ||= Song.all
    render json: @songs
  end

  def show
    render json: Song.find(params[:id])
  end

  def associate
    song_id = params[:id]
    song_query = Song.where(id: song_id)

    # Verify that song exists
    render nothing: true, status: 404  and return if song_query.empty?
    song = song_query.first

    # The user must have a location set
    location = current_user.location
    render json: 'User location not set', status: 400  and return unless location

    if current_user.songs.map(&:id).include? song_id.to_i
      render json: 'Song already associated', status: 400
    elsif current_user.song.size >= 10
      render json: 'Limit for user songs reached', status: 400
    else
      current_user.songs << song
      render nothing: true, status: 200
    end
  end

  def dissasociate
    songs = current_user.songs
    target = params[:id]
    if songs.map(&:id).include? target
      current_user.songs.delete(target)
      render json: {}, status: 200
    else
      render json: 'Track not associated to user', status: 404
    end
  end

  def data
    songq = Song.where(params[:id])

    render nothing: true, status: 404 and return if songq.empty?
    song = songq.first

    track = song.as_track
    render json: {preview: track.preview_url,
                  uri: track.uri,
                  images: track.images}, status: 200
  end
end
