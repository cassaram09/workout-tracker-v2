class ApplicationController < ActionController::API
  before_action :authenticate 

  # Check if the user is authenticated before every request
  def authenticate
    render json: {error: "unauthorized"}, status: 401 unless logged_in?
  end

  # check if the current user is logged in
  def logged_in?
    !!current_user
  end

  # set our current user
  def current_user
    if auth_key_present?
      # if auth key is present, find the user
      user = User.find(auth["user"])
      if user
        @current_user ||= user
      end
    end
  end

  
  private

  # get token from from the headers of the request
  def token
    request.env["HTTP_AUTHORIZATION"].scan(/Bearer (.*)$/).flatten.last
  end

  # JWT decode the token - returns a object with user id
  def auth
    Auth.decode(token)
  end

  #check if a auth key is present in headers
  def auth_key_present?
    !!request.env.fetch("HTTP_AUTHORIZATION", "").scan(/Bearer/).flatten.first
  end
end
