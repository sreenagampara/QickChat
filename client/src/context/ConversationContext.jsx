import { createContext, useContext, useState } from "react";

const ConversationContext = createContext();

export const useConversation = () => {
    return useContext(ConversationContext);
};

export const ConversationContextProvider = ({ children }) => {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <ConversationContext.Provider value={{ selectedConversation, setSelectedConversation, messages, setMessages, isProfileOpen, setIsProfileOpen }}>
            {children}
        </ConversationContext.Provider>
    );
};
