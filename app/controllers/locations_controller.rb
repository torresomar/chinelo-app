class LocationsController < ApplicationController
  respond_to :json

  def index
    @locations ||= Location.all
    render json: @locations
  end

  def show
    render json: Location.find(params[:id])
  end
end
