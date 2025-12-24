const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./Model/index');
const routers = require('./Routes/index');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routers);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server is running on', port);
});
