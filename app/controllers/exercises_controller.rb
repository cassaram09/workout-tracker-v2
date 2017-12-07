class ExercisesController < ApplicationController
  def index
    @exercises = Exercise.all
    render json: @exercises
  end

  def create
    @exercise = Exercise.new(exercise_params)
    if @exercise.save
      render json: @exercise
    end
  end

  def show
    @exercise = Exercise.find(params[:id])
    render json: @exercise
  end

  def update
    @exercise = Exercise.find(exercise_params[:id])
    
    param_ids = exercise_params[:exercise_sets_attributes].collect {|set| set[:id]}
    ids = ExerciseSet.where(exercise_id: @exercise.id).pluck(:id)
    to_delete = ids.select {|id| !param_ids.include?(id) }
   
    if @exercise.update(exercise_params)
      ExerciseSet.where(id: to_delete).destroy_all
      render json: @exercise
    end
  end

  def destroy
    @exercise = Exercise.find(params[:id])
    if @exercise.destroy
      render json: @exercise
    end
  end

  private
  def exercise_params
    params.require(:exercise).permit(:id, :name, :rest_time, exercise_sets_attributes: [:repititions, :weight, :id, :exercise_id])
  end
end
