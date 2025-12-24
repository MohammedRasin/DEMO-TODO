const todoModel = require('../Model/todoSchema');
const jwt = require('jsonwebtoken');

// module.exports.todoCreate = async (req, res) => {
//   try {
//     const { task } = req.body;
//     const response = await todoModel.create({ task });
//     return res
//       .status(201)
//       .json({ message: 'add task sucssessfully', data: response });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

module.exports.todoCreate = async (req, res) => {
  try {
    const { task } = req.body;
    const response = await todoModel.create({ task });
    const key = 'lakjdflsakjdf';
    const token = jwt.sign({ id: response._id }, key, { expiresIn: 100 });
    return res
      .status(201)
      .json({ message: 'add task sucssessfully', data: response, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getAllTodos = async (req, res) => {
  try {
    const response = await todoModel.find();
    return res
      .status(201)
      .json({ message: 'get todos succesfully', data: response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.DeleteTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await todoModel.findByIdAndDelete(id);
    return res
      .status(201)
      .json({ message: 'Delete todo succesfully', data: response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.updateTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const updated = await todoModel.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: 'Todo updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
