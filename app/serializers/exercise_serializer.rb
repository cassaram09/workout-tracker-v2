class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :rest_time, :exercise_sets
  def exercise_sets
    object.exercise_sets.order("created_at")
  end
end
