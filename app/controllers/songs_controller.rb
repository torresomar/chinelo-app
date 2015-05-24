class SongsController < ApplicationController
  respond_to :json

  def index
    @songs ||= Song.all
    render json: @songs.to_json(only: [:id, :uri, :name])
  end

  def show
    render json: Song.find(params[:id])
  end
end
