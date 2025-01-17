import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new Schema({
    name:{
        type: String,
        required: [true, "Please enter your name!"],
      },
      email:{
        type: String,
        required: [true, "Please enter your email!"],
      },
      password:{
        type: String,
        required: [true, "Please enter your password"],
        
      },
      phoneNumber:{
        type: Number,
      },
      addresses:[
        {
          country: {
            type: String,
          },
          city:{
            type: String,
          },
          address1:{
            type: String,
          },
          address2:{
            type: String,
          },
          zipCode:{
            type: Number,
          },
          addressType:{
            type: String,
          },
        }
      ],
      role:{
        type: String,
        default: "user",
      },
      avatar:{
        public_id: {
          type: String,
          // required: true,
        },
        url: {
          type: String,
          // required: true,
        },
     },
     createdAt:{
      type: Date,
      default: Date.now(),
     },
     resetPasswordToken: String,
     resetPasswordTime: Date,
    });


userSchema.pre('save', async function(next) {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        if (this.isModified('otp')) {
            this.otp = bcrypt.hash(this.otp, 10);
        }
        next();
    });
    
userSchema.methods.isPasswordCorrect = async function(password) {
        return await bcrypt.compare(password, this.password);
    };
    
userSchema.methods.isOtpCorrect = async function(otp) {
        return await bcrypt.compare(otp, this.otp);
    };
    
userSchema.methods.generateAccessToken = function() {
        return jwt.sign({
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
    };
    
userSchema.methods.generateRefreshToken = function() {
        return jwt.sign({
            _id: this._id,
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
    };
    
export const User = mongoose.model('User', userSchema);