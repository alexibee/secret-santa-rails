class CreateGifts < ActiveRecord::Migration[7.0]
  def change
    create_table :gifts do |t|
      t.string :name
      t.integer :price
      t.string :url
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
