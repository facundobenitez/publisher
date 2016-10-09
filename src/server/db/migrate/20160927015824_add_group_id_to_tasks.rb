class AddGroupIdToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :group_id, :integer, :limit => 8
  end
end
