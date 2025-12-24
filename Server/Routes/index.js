const express = require('express');
const router = express.Router();
const todoRoutes = require('./todoRoutes');
const userRoutes = require('./userRoutes');
router.use('/add', todoRoutes);
router.use('/auth', userRoutes);
module.exports = router;
