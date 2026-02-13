import { useConversation } from "../../context/ConversationContext";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIdx }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id?.toString());

    return (
        <>
            <div
                data-testid="conversation-item"
                className={`flex gap-2 items-center hover:bg-green-500 rounded p-2 py-1 cursor-pointer
                ${isSelected ? "bg-green-500" : ""}
            `}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className='w-12 rounded-full'>
                        {conversation.profileImage && !conversation.profileImage.includes("avatar.iran.liara.run") ? (
                            <img src={conversation.profileImage} alt='user avatar' />
                        ) : (
                            <div className="w-full h-full"></div>
                        )}

                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-800'>{conversation.name}</p>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </>
    );
};
export default Conversation;
