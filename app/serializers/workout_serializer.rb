class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :start_time, :end_time
  has_many :exercises

  def exercises
    object.exercises.order("created_at")
  end

  def start_time
    object.start_time.strftime('%H:%M')
  end

  def end_time
    object.end_time.strftime('%H:%M')
  end
end
