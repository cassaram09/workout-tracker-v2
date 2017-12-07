class CreateWorkouts < ActiveRecord::Migration[5.1]
  def change
    create_table :workouts do |t|
      t.string :name
      t.date :date
      t.datetime :start_time
      t.datetime :end_time
      t.integer :user_id
      t.timestamps
    end
  end
end
