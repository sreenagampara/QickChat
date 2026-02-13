import Message from '../models/message.model.js';
import User from '../models/user.model.js';
import { getReceiverSocketId, io } from '../sockets/socket.js';
import cloudinary from '../config/cloudinary.js';

export const getUsersForSidebar = async (req, res, next) => {
    try {
        const loggedInUserId = req.user._id;

        // Find all users except the logged in user
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        next(error);
    }
};

export const getMessages = async (req, res, next) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages controller: ", error.message);
        next(error);
    }
};

export const sendMessage = async (req, res, next) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl = "";
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message: text,
            image: imageUrl,
            messageType: imageUrl ? 'image' : 'text'
        });

        if (newMessage) {
            await newMessage.save();
        }

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage controller: ", error.message);
        next(error);
    }
};

export const deleteMessage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const senderId = req.user._id;

        const message = await Message.findById(id);
        if (!message) return res.status(404).json({ message: "Message not found" });

        // Ensure only sender can delete (for now) 
        if (message.senderId.toString() !== senderId.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this message" });
        }

        await Message.findByIdAndDelete(id);

        // Emit socket event for real-time deletion
        const receiverSocketId = getReceiverSocketId(message.receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("messageDeleted", id);
        }

        res.status(200).json({ message: "Message deleted successfully", id });
    } catch (error) {
        console.error("Error in deleteMessage controller: ", error.message);
        next(error);
    }
};

export const updateMessage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { message: newText } = req.body;
        const senderId = req.user._id;

        const message = await Message.findById(id);
        if (!message) return res.status(404).json({ message: "Message not found" });

        if (message.senderId.toString() !== senderId.toString()) {
            return res.status(403).json({ message: "Unauthorized to update this message" });
        }

        message.message = newText;
        await message.save();

        // Emit socket event for real-time update
        const receiverSocketId = getReceiverSocketId(message.receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("messageUpdated", message);
        }

        res.status(200).json(message);
    } catch (error) {
        console.error("Error in updateMessage controller: ", error.message);
        next(error);
    }
};
