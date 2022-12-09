# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_12_08_231450) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.string "location"
    t.date "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "organiser_id", null: false
    t.index ["organiser_id"], name: "index_events_on_organiser_id"
  end

  create_table "gifts", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "groups", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_groups_on_event_id"
  end

  create_table "jwt_deny_list", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_deny_list_on_jti"
  end

  create_table "members", force: :cascade do |t|
    t.string "name"
    t.integer "member_nr"
    t.bigint "user_id"
    t.bigint "group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email"
    t.index ["group_id"], name: "index_members_on_group_id"
    t.index ["user_id"], name: "index_members_on_user_id"
  end

  create_table "pairs", force: :cascade do |t|
    t.bigint "giver_id", null: false
    t.bigint "receiver_id", null: false
    t.bigint "group_id", null: false
    t.boolean "exclusion", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["giver_id"], name: "index_pairs_on_giver_id"
    t.index ["group_id"], name: "index_pairs_on_group_id"
    t.index ["receiver_id"], name: "index_pairs_on_receiver_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "wishes", force: :cascade do |t|
    t.bigint "wishlist_id", null: false
    t.bigint "gift_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["gift_id"], name: "index_wishes_on_gift_id"
    t.index ["wishlist_id"], name: "index_wishes_on_wishlist_id"
  end

  create_table "wishlists", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_wishlists_on_user_id"
  end

  add_foreign_key "events", "users", column: "organiser_id"
  add_foreign_key "groups", "events"
  add_foreign_key "members", "groups"
  add_foreign_key "members", "users"
  add_foreign_key "pairs", "groups"
  add_foreign_key "pairs", "members", column: "giver_id"
  add_foreign_key "pairs", "members", column: "receiver_id"
  add_foreign_key "wishes", "gifts"
  add_foreign_key "wishes", "wishlists"
  add_foreign_key "wishlists", "users"
end
