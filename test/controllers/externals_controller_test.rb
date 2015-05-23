require 'test_helper'

class ExternalsControllerTest < ActionController::TestCase
  test "should get modal" do
    get :modal
    assert_response :success
  end

  test "should get modal_multichoice" do
    get :modal_multichoice
    assert_response :success
  end

  test "should get navigation" do
    get :navigation
    assert_response :success
  end

  test "should get searchbar" do
    get :searchbar
    assert_response :success
  end

end
