class CreatePairs < ActiveRecord::Migration[7.0]
  def change
    create_table :pairs do |t|
      t.references :giver, null: false, foreign_key: { to_table: :members }
      t.references :receiver, null: false, foreign_key: { to_table: :members }
      t.boolean :exclusion, default: false

      t.timestamps
    end
  end
end
