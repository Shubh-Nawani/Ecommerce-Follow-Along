const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).send("User already exists");
        }

        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for hashing
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the hashed password
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.send("User created successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = signup;
