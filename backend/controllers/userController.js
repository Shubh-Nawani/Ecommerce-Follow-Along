const User = require('../models/userModel');
const bcyrpt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const {email, password} = req.body;

        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({message: "User Already Exists!"});
        }

        const hash = await bcyrpt.hash(password, 10);

        const newUser = new User({
            email,
            password: hash
        });

        await newUser.save()
        return res.status(201).json({message: "Profile Created Successfully!"});

        
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const existingUser = await User.findOne({email});

        if (!existingUser) {
            return res.status(400).json({message: "User Does Not Exists!"});
        }
        

        const isMatch = await bcyrpt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(400).json({message: "Password Match Failed!"});
        }

        return res.status(200).json({message: "Login Successfull!"});



    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

module.exports = {signup, login};