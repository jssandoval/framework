const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  date_create: { type: Date, default: Date.now },
  date_modification: { type: Date },
  date_lastlogin: { type: Date },
  change_password: { type: Boolean },
  days_changepassword: { type: Number },
  date_lastchage: { type: Date },
  status: { type: Boolean, default: false },
  menus: [
    {
      type: Schema.Types.ObjectId,
      ref: "Menu",
    },
  ],
  schools: [
    {
      type: Schema.Types.ObjectId,
      ref: "School",
    }
  ]
});

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);
