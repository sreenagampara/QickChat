import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useConversation } from "../context/ConversationContext";
// import notificationSound from "../assets/sounds/notification.mp3"; // Optional

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            // newMessage.shouldShake = true; // For animation
            // const sound = new Audio(notificationSound);
            // sound.play();
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        socket?.on("messageUpdated", (updatedMessage) => {
            setMessages((prevMessages) => prevMessages.map((m) => (m._id === updatedMessage._id ? updatedMessage : m)));
        });

        socket?.on("messageDeleted", (deletedMessageId) => {
            setMessages((prevMessages) => prevMessages.filter((m) => m._id !== deletedMessageId));
        });

        return () => {
            socket?.off("newMessage");
            socket?.off("messageUpdated");
            socket?.off("messageDeleted");
        };
    }, [socket, setMessages]);
};

export default useListenMessages;
