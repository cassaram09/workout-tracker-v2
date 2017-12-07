class CreateExercises < ActiveRecord::Migration[5.1]
  def change
    create_table :exercises do |t|
      t.string :name
      t.integer :rest_time
      t.integer :workout_id
      t.timestamps
    end
  end
end
