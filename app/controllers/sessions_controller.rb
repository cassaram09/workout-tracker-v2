class SessionsController < ApplicationController

  skip_before_action :authenticate

  def create

    if invalid(auth_params)
      render_error_payload(:invalid_login, status: :forbidden)
      return 
    end

    @user = User.find_by(email: auth_params[:email])

    if !@user
      render_error_payload(:invalid_login, status: :forbidden)
      return
    end

    if @user.authenticate(auth_params[:password])
      jwt = Auth.issue({user: @user.id})
      render json: {jwt: jwt}
    end

  end

  def invalid(params)
    params[:email] == nil || params[:password] == nil || params[:password] == "" || params[:email] == ""
  end

  private
  def auth_params
    params.require(:user).permit(:email, :password)
  end
end