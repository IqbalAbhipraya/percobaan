require('dotenv').config();

// import express
const express = require('express');
// buat instance aplikasi express
const app = express();
// database
const db = require('./src/models');
// port antara dari env atau 3000
const port = process.env.PORT || 3000;

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function testDbConnection() {
    try {
        await db.sequelize.authenticate();
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

testDbConnection()

// routes
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

// jalanin server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});