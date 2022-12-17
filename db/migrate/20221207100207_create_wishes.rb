class CreateWishes < ActiveRecord::Migration[7.0]
  def change
    create_table :wishes do |t|
      t.string :name
      t.integer :price
      t.string :url
      t.references :wishlist, null: false, foreign_key: true
      t.references :gift, null: true, foreign_key: true

      t.timestamps
    end
  end
end
