const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todoDB').then(() => {
  try {
    console.log('DB CONNECTED SUCCESSFULLY');
  } catch (error) {
    console.log({ message: error.message });
  }
});
