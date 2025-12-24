const express = require('express');
const router = express.Router();
const {
  userCreate,
  userLogin,
  getAllUsers,
  DeleteUsersById,
} = require('../Controllers/userControllers');
const { tokenVerify } = require('../Middlewares/AuthToken');

router.post('/signup', userCreate);
router.post('/login', userLogin);
router.get('/users', tokenVerify, getAllUsers);
router.delete('/users/:id', tokenVerify(['user']), DeleteUsersById);
module.exports = router;
