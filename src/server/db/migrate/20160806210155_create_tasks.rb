class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.references :post, index: true, foreign_key: true
      t.string :group_name
      t.integer :week_day
      t.time :time

      t.timestamps null: false
    end
  end
end
