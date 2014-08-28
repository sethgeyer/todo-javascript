class AddStatusToTodos < ActiveRecord::Migration
  def change
    add_column :todos, :completed, :boolean
  end
end
