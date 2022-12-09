class DeleteOrganiserFromEvents < ActiveRecord::Migration[7.0]
  def change
    remove_columns :events, :organiser
  end
end
