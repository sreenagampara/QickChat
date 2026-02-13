import { useState } from "react";
import { useConversation } from "../context/ConversationContext";
import axios from "axios";
import { toast } from "react-toastify";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message, image) => {
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/messages/send/${selectedConversation._id}`, {
                text: message,
                image
            }, { withCredentials: true });

            if (res.data.error) throw new Error(res.data.error);

            setMessages([...messages, res.data]);
        } catch (error) {
            console.error("SEND_MESSAGE_ERROR:", error.response?.data || error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
