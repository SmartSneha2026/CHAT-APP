import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.js";
import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = catchAsyncError(async (req, res, next) => {

    const {fullName ,email , password} = req.body;

    if(!fullName || !email || !password) {
        return res.status(400).json({
            success: false,
            message : "Please  provide All fields required",
        });
    }
    const emailRegex = /^\S+@\S+\.\S+$/ ;

    if(!emailRegex.test(email)){
        return res.status(400).json({
            success: false,
            message : "Please provide a valid email address",
        });
    }
    if(password.length < 8){
            return res.status(400).json({
                success: false,
                message : "Password must be at least 8 characters long",
            });
    }

    const isEmailAlreadyUsed = await User.findOne({ email });
    if (isEmailAlreadyUsed){
        return res.status(400).json({
            success: false,
            message : "Email is already registered.",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName,
        email,
        password :  hashedPassword,
        avatar : {
            public_id : "",
            url : "",
        },
    });
});
export const signin = catchAsyncError(async (req, res, next) => {});
export const signout = catchAsyncError(async (req, res, next) => {});
export const getUser = catchAsyncError(async (req, res, next) => {});
export const updateProfile = catchAsyncError(async (req, res, next) => {});

