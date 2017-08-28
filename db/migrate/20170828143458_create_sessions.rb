class CreateSessions < ActiveRecord::Migration[5.1]
  def change
    create_table :sessions do |t|
      t.string :comment
      t.integer :rating

      t.timestamps
    end
  end
end
