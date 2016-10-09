class AddFrecuencyValueToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :frecuency_value, :integer
    add_column :tasks, :frecuency_type, :integer
  end
end
