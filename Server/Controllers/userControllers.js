const userModel = require('../Model/userSchema');
const jwt = require('jsonwebtoken');
module.exports.userCreate = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const response = await userModel.create({ name, email, password });
    const key = 'cmnksacnksncksdv';
    const token = jwt.sign({ id: response._id, role: 'user' }, key, {
      expiresIn: '1d',
    });
    return res
      .status(201)
      .json({ message: 'USER CREATED SUCCESFULLY', data: response, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    const key = 'cmnksacnksncksdv';
    const token = jwt.sign({ id: user?._id, role: 'user' }, key, {
      expiresIn: '1d',
    });

    return res.status(200).json({ message: 'login ', user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.getAllUsers = async (req, res) => {
  try {
    const response = await userModel.find();
    return res
      .status(201)
      .json({ message: 'get Users succesfully', data: response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.DeleteUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userModel.findByIdAndDelete(id);
    return res
      .status(201)
      .json({ message: 'Delete User succesfully', data: response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
