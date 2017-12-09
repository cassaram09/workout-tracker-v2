class User < ApplicationRecord
  has_many :workouts
  has_many :exercises, through: :workouts

  has_secure_password
  # validates :email, uniqueness: true, presence: true
  # validates :password, :password_confirmation, presence: true

  has_attached_file :avatar, styles: { medium: "300x300", thumb: "100x100" }
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  def workout_hours
    hours = 0
    workouts.each {|w| hours += (w.end_time - w.start_time) / 60}
    return hours
  end
end
