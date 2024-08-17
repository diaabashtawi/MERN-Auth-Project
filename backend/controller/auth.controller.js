import bcryptjs from "bcryptjs";
import crypto from "crypto";

import {User} from "../models/user.model.js";
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";
import {sendVerificationEmail, sendWelcomeEmail, sendPasswordRestEmail, sendRestSuccessEmail} from "../nodemailer/emails.js";


export const signup = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        if (!name || !email || !password) {
            throw new Error("All field are required");
        }
        const userAlreadyExists = await User.findOne({email});
        if (userAlreadyExists) {
            return res.status(400).json({success: false, message: 'User already exists'});
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        })
        await user.save()

        // jwt token
        generateTokenAndSetCookie(res, user._id)

        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

export const verifyEmail = async (req, res) => {
    const {verificationCode} = req.body;
    try {
        const user = await User.findOne({
            verificationToken: verificationCode,
            verificationTokenExpiresAt: {$gt: Date.now()},
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification code'
            });
        }
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()
        await sendWelcomeEmail(user.email, user.name)
        res.status(200).json({
            success: true,
            message: 'User verification successfully',
            user: {
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        console.log(`Error in verification email: ${error}`);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("Error in login ", error);
        res.status(400).json({success: false, message: error.message});
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    })
}

export const forgoPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({success: false, message: "User NOT FOUND!"});
        }
        const restToken = crypto.randomBytes(20).toString("hex")
        const restTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000
        user.resetPasswordToken = restToken
        user.resetPasswordExpiresAt = restTokenExpiresAt
        await user.save()
        await sendPasswordRestEmail(user.email, `${process.env.CLIENT_URL}/rest-password/${restToken}`)
        res.status(200).json({
            success: true,
            message: 'Password reset link sent to your email',
        })
    } catch (error) {
        console.log("Error in forgotPassword ", error);
        res.status(400).json({success: false, message: error.message});
    }

}

export const resetPassword = async (req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body
        const user =await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gte: Date.now()},
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token"
            });
        }
        const hashedPassword = await bcryptjs.hash(password, 10)
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined
        await user.save();
        await sendRestSuccessEmail(user.email)
        res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        })
    } catch (error) {
        console.log("Error in reseting password ", error);
        res.status(400).json({success: false, message: error.message});
    }

}

export const checkAuth  = async (req, res) => {
    try{
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found!"
            });
        }
        res.status(200).json({
            success: true,
            user
        })
    }catch (error){
        console.log('Error in authunticated', error)
        res.status(400).json({success: false, message: error.message});
    }
}


