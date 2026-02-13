import { useEffect, useState } from "react";
import { useConversation } from "../context/ConversationContext";
import axios from "axios";
import { toast } from "react-toastify";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/messages/${selectedConversation._id}`, { withCredentials: true });
                if (res.data.error) throw new Error(res.data.error);
                setMessages(res.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};

export default useGetMessages;
