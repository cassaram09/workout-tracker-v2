class Exercise < ApplicationRecord
  belongs_to :workout
  has_many :exercise_sets

  accepts_nested_attributes_for :exercise_sets

  before_destroy :destroy_exercise_sets
  
  private

  def destroy_exercise_sets
   self.exercise_sets.destroy_all
  end
end
