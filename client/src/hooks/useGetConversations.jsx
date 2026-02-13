import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/messages/users`, { withCredentials: true });
                if (res.data.error) {
                    throw new Error(res.data.error);
                }
                setConversations(res.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};

export default useGetConversations;
