import { useAuthContext } from "../../context/AuthContext";
import { useConversation } from "../../context/ConversationContext";
import { extractTime } from "../../utils/extractTime"; // Need to create this Util

import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical, BsPencil, BsTrash } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation, messages, setMessages } = useConversation();

    // Ensure safe ID comparison
    const fromMe = message.senderId?.toString() === authUser?._id?.toString();

    const formattedTime = extractTime(message.createdAt);

    // Determine alignment classes
    // User requested: Sender (Me) -> Left, Receiver (Other) -> Right
    const chatClassName = fromMe ? "chat-start place-self-start" : "chat-end place-self-end";

    // Bubble colors
    const bubbleBgColor = "bg-gray-100 text-black border border-gray-200"; // Light gray background with border
    const shakeClass = message.shouldShake ? "shake" : "";

    const [showMenu, setShowMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(message.message);
    const menuRef = useRef(null);

    // Close menu when clicking outside (not needed as much with modal backdrop, but good practice)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this message?")) return;
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/messages/${message._id}`, { withCredentials: true });
            toast.success("Message deleted");
            setMessages(messages.filter(m => m._id !== message._id));
            setShowMenu(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/messages/${message._id}`, { message: editContent }, { withCredentials: true });
            toast.success("Message updated");

            // Update local state
            setMessages(messages.map(m => m._id === message._id ? { ...m, message: editContent } : m));
            setIsEditing(false);
            setShowMenu(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update");
        }
    };

    return (
        <div className={`chat ${chatClassName} group relative w-full flex ${fromMe ? 'justify-start' : 'justify-end'} mb-4`}>
            {/* Profile picture removed */}

            {/* Message Bubble - Click to open menu */}
            <div
                className={`chat-bubble ${bubbleBgColor} ${shakeClass} p-3 text-sm shadow-md flex flex-col relative max-w-[50%] ${fromMe && !isEditing ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                onClick={() => !isEditing && fromMe && setShowMenu(true)}
            >

                {/* 3-Dot Menu REMOVED */}

                {/* Image */}
                {message.image && <img src={message.image} alt="Sent image" className="rounded-md mb-2 max-w-full" />}

                {/* Text Content */}
                {isEditing ? (
                    <div onClick={(e) => e.stopPropagation()} className="w-full">
                        <form onSubmit={handleUpdate} className="mt-1">
                            <input
                                type="text"
                                className="input input-bordered input-xs w-full text-black bg-white"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                autoFocus
                            />
                            <div className="flex gap-1 mt-1 justify-end">
                                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-xs btn-ghost text-red-500">Cancel</button>
                                <button type="submit" className="btn btn-xs btn-success text-white">Save</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    message.message && <p className="break-words">{message.message}</p>
                )}
            </div>

            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center font-medium text-gray-400 mt-1 select-none'>{formattedTime}</div>

            {/* Message Options Menu (Centered Popup) */}
            {showMenu && (
                <div
                    ref={menuRef}
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] bg-white p-6 rounded-lg shadow-2xl border border-gray-200 w-64 flex flex-col gap-3"
                >
                    <h3 className="text-lg font-bold text-center text-gray-800 border-b pb-2">Message Options</h3>

                    <button
                        onClick={() => { setIsEditing(true); setShowMenu(false); }}
                        className="btn btn-sm btn-ghost justify-start text-blue-600 hover:bg-blue-50"
                    >
                        <BsPencil /> Edit Message
                    </button>

                    <button
                        onClick={handleDelete}
                        className="btn btn-sm btn-ghost justify-start text-red-600 hover:bg-red-50"
                    >
                        <BsTrash /> Delete Message
                    </button>

                    <div className="divider my-0"></div>

                    <button
                        onClick={() => setShowMenu(false)}
                        className="btn btn-sm btn-neutral btn-outline w-full"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};
export default Message;
