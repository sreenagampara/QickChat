import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, 
        sameSite: isProduction,
        secure: isProduction ? "none" : "lax"
    });
};

export const register = async (req, res, next) => {
    try {
        const { name, email, password, profileImage } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            profileImage
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profileImage: newUser.profileImage,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.error("Error in signup controller", error.message);
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
        });
    } catch (error) {
        console.error("Error in login controller", error.message);
        next(error);
    }
};

export const logout = (req, res, next) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller", error.message);
        next(error);
    }
};

import cloudinary from '../config/cloudinary.js';

export const updateProfile = async (req, res, next) => {
    try {
        const { profileImage, name } = req.body;
        const userId = req.user._id;

        const updates = {};
        if (name) updates.name = name;

        if (profileImage) {
            const uploadResponse = await cloudinary.uploader.upload(profileImage);
            updates.profileImage = uploadResponse.secure_url;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "No changes provided" });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        res.status(200).json(updatedUser);

    } catch (error) {
        console.error("error in update profile:", error);
        next(error);
    }
};

export const checkAuth = (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkAuth controller", error.message);
        next(error);
    }
}
