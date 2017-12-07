class CreateExercises < ActiveRecord::Migration[5.1]
  def change
    create_table :exercises do |t|

      t.timestamps
    end
  end
end
