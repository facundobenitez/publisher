class RemoveGroupNameFromTasks < ActiveRecord::Migration
  def change
    remove_column :tasks, :group_name, :string
  end
end
