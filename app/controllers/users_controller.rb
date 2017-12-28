class UsersController < ApplicationController
  skip_before_action :authenticate, only: :create

  def create
    if User.find_by(email: user_params[:email])
      render_error_payload(:invalid_signup, status: :forbidden)
      return
    end

    @user = User.new(user_params)

    if @user.save
      jwt = Auth.issue({user: @user.id})
      render json: {jwt: jwt}
    else 
      render_error_payload(:invalid_signup, status: :forbidden)
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

  def dashboard
    @user = User.find_by(id: current_user.id)
    render json: {
      last_workout: @user.workouts.last,
      workout_hours: @user.workout_hours,
      total_workouts: @user.workouts.length
    }
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :avatar, :name, :age, :weight, :height, :gender, :body_fat, :bmr, :smoker, :drinker, :vegetarian)
  end
end
