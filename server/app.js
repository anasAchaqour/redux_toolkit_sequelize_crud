const express = require('express');
const cors = require('cors');
const db = require('./models'); // Import your Sequelize models

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection and Sync
db.sequelize.sync({ alter: true })
    .then(() => console.log('Database synced!'))
    .catch(err => console.error('Error syncing database:', err));

// Routers
const userRoutes = require('./routes/userRouter');
app.use('/api/users', userRoutes);

// Port
const PORT = process.env.PORT || 8080;

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});