import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ name, email, password, confirmPassword }) => {
        const success = handleInputErrors({ name, email, password, confirmPassword });
        if (!success) return;

        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
                name,
                email,
                password,
                confirmPassword
            }, { withCredentials: true });

            if (res.data.error) {
                throw new Error(res.data.error);
            }

            // Save user to local storage
            localStorage.setItem("chat-user", JSON.stringify(res.data));
            setAuthUser(res.data);

        } catch (error) {
            console.error("SIGNUP_ERROR:", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

function handleInputErrors({ name, email, password, confirmPassword }) {
    if (!name || !email || !password || !confirmPassword) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}
