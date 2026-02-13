import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (email, password) => {
        const success = handleInputErrors({ email, password });
        if (!success) return;

        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
                email,
                password
            }, { withCredentials: true });

            if (res.data.error) {
                throw new Error(res.data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(res.data));
            setAuthUser(res.data);

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;

function handleInputErrors({ email, password }) {
    if (!email || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}
