class PagesController < ApplicationController
  include ApplicationHelper
  before_action :user_is_logged?, only: [:index,:spotify]
  def authenticate
  end
  def index
    @user = current_user
  end
  def songify
    @user = current_user
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
