const mongoose = require("mongoose")

function validatePassword(password) {
    return (
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    )
}



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
        
        validate: {
            validator: validatePassword,
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    },
},
})

module.exports = mongoose.model("User", userSchema);