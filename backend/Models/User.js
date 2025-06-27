const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    postalCode: Number,
    points: { type: Number, required: true,default: 0 }
})
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};


const User = mongoose.model("User",userSchema);


module.exports = User;