class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :title
      t.string :description
      t.string :location
      t.date :date
      t.string :organiser

      t.timestamps
    end
  end
end
