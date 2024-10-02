const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');

        const adminUser = new User({
            username: 'admin',
            email: 'admin@example.com',
            password: 'yourpassword',
            firstName: 'Admin',
            lastName: 'User',
            role: ['Admin'] 
        });

        adminUser.save()
            .then(() => {
                console.log('Admin user created successfully');
                mongoose.connection.close(); 
            })
            .catch(err => {
                console.error('Error creating admin user:', err);
                mongoose.connection.close();
            });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
