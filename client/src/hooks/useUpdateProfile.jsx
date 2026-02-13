import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser, authUser } = useAuthContext();

    const updateProfile = async ({ name, profileImage }) => {
        setLoading(true);
        try {
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/auth/update-profile`, {
                name,
                profileImage
            }, { withCredentials: true });

            if (res.data.error) {
                throw new Error(res.data.error);
            }

            // Update local storage and context
            const updatedUser = { ...authUser, ...res.data };
            localStorage.setItem("chat-user", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            toast.success("Profile updated successfully");
            return true;
        } catch (error) {
            console.error("PROFILE_UPDATE_ERROR:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, updateProfile };
};

export default useUpdateProfile;
