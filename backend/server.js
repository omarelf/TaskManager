const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());

app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/task', require('./routes/taskRoutes'));
// Other routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
