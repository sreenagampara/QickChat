import { useEffect } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { useConversation } from "../../context/ConversationContext";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation, setIsProfileOpen } = useConversation();

    useEffect(() => {
        // cleanup function (unmounts)
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div className='md:min-w-[450px] flex flex-col flex-1 border-r border-gray-200 bg-white'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div className='bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2'>
                        <button
                            className='md:hidden mr-2 text-gray-500 hover:text-gray-700'
                            onClick={() => setSelectedConversation(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <span className='label-text font-medium text-gray-500 hidden sm:block'>To:</span>
                        <div
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors"
                            onClick={() => setIsProfileOpen(true)}
                        >
                            <span className='text-gray-900 font-bold text-lg'>{selectedConversation.name}</span>
                        </div>
                    </div>

                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};
export default MessageContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full bg-gray-50'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-500 font-semibold flex flex-col items-center gap-4'>
                <p className="text-2xl text-gray-800">Welcome 👋 {authUser.name} ❄</p>
                <p className="text-lg font-normal">Select a chat to start messaging</p>
                <TiMessages className='text-6xl text-blue-500' />
            </div>
        </div>
    );
};
