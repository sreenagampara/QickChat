import { useConversation } from "../../context/ConversationContext";
import { useSocketContext } from "../../context/SocketContext";

const RightSidebar = () => {
    const { selectedConversation, setIsProfileOpen } = useConversation();
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(selectedConversation?._id);

    if (!selectedConversation) return (
        <div className='w-[300px] border-l border-gray-200 bg-gray-50 items-center justify-center p-4 h-full hidden lg:flex'>
            <p className="text-gray-400 text-sm text-center">Select a chat to view details</p>
        </div>
    );

    return (
        <div className='border-l border-gray-200 p-6 flex flex-col items-center bg-gray-50 w-full lg:w-[300px] h-full overflow-y-auto'>
            <div className="self-start mb-4 lg:hidden">
                <button
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <span>Back</span>
                </button>
            </div>

            <div className='avatar mb-4'>
                <div className={`w-28 rounded-full ring-4 ${isOnline ? "ring-green-400" : "ring-gray-300"} ring-offset-2 ring-offset-white`}>
                    <img src={selectedConversation.profileImage} alt='user avatar' />
                </div>
            </div>

            <h2 className='text-2xl font-bold text-gray-800 mb-1 text-center'>{selectedConversation.name}</h2>
            <span className={`text-sm font-medium mb-6 ${isOnline ? "text-green-500" : "text-gray-500"}`}>
                {isOnline ? "● Active Now" : "○ Offline"}
            </span>

            <div className='w-full space-y-4'>
                <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
                    <span className='block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1'>Email</span>
                    <span className='text-gray-700 font-medium break-all'>{selectedConversation.email || "Hidden"}</span>
                </div>

                <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
                    <span className='block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1'>About</span>
                    <span className='text-gray-700 font-medium'>{selectedConversation.about || "Hey there! I am using Quick Chat."}</span>
                </div>

                <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
                    <span className='block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1'>Joined</span>
                    <span className='text-gray-700 font-medium'>
                        {new Date(selectedConversation.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                </div>
            </div>
        </div>
    );
};
export default RightSidebar;
