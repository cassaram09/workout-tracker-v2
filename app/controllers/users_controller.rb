class UsersController < ApplicationController
  skip_before_action :authenticate, only: :create

  def create
    @user = User.new(user_params)
    if @user.save
      jwt = Auth.issue({user: @user.id})
      render json: {jwt: jwt}
    else 
      render json: {error: "Sign up failed."}, status: 500
    end
  end

  def update
    @user = User.find_by(id: current_user.id)
    if @user.update(user_params)
      render json: @user
    end
  end

  def destroy

  end

  def get_current_user
    @user = User.find_by(id: current_user.id)
    render json: @user
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :avatar, :name, :age, :weight, :height, :gender, :body_fat, :bmr, :smoker, :drinker, :vegetarian)
  end
end
