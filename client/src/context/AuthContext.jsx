import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
    const [loading, setLoading] = useState(false);

    axios.defaults.withCredentials = true;

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
