class AddCoordinatesToEvent < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :lat, :float
    add_column :events, :lng, :float
  end
end
