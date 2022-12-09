class AddOrganiserReferenceToEvents < ActiveRecord::Migration[7.0]
  def change
    add_reference :events, :organiser, null: false, foreign_key: { to_table: :users }
  end
end
