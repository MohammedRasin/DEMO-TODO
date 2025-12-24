const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: [true, 'Email is required'] },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});
const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;
