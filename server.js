const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const scanRoutes = require('./routes/scan');
const salesAssociateRoutes = require('./routes/salesAssociates');
const authenticateJWT = require('./middleware/authenticateJWT');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJWT);

app.use('/api/scan', scanRoutes);
app.use('/api/salesAssociates', salesAssociateRoutes);  // Add the sales associate routes

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});