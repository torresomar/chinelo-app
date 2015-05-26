class PagesController < ApplicationController
  include ApplicationHelper
  before_action :user_is_logged?, only: [:index,:spotify]
  def authenticate
  end
  def index
  end
  def songify
  end
  private
  def user_is_logged?
    if current_user
      @current_user = current_user
    else
      redirect_to authenticate_path
    end
  end
end
