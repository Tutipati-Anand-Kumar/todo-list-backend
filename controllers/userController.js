// server/controllers/userController.js
const User = require('../models/userModel');
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const user = await User.create({ name, email, password });

        if (user) {
            res.status(201).json({
                id: user._id,
                name: user.name,
                email: user.email,
                message: 'User registered successfully',
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

const checkUserExit = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: 'Email query parameter is required' });
        }

        const user = await User.findOne({ email });
        const exists = !!user; 

        res.status(200).json({ exists: exists, length: exists ? 1 : 0 }); 

    } catch (error) {
        console.error("Check User Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const secureLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                isCredintials: true,
                data: [{
                    id: user._id,
                    email: user.email,
                    name: user.name,
                }]
            });
        } else {
            res.status(200).json({ isCredintials: false });
        }
    } catch (error) {
        console.error("Secure Login Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { registerUser, checkUserExit, secureLogin };