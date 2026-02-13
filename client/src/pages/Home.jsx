import Sidebar from "../components/sidebar/Sidebar";
import MessageContainer from "../components/messages/MessageContainer";
import RightSidebar from "../components/sidebar/RightSidebar";
import { useConversation } from "../context/ConversationContext";

const Home = () => {
    const { selectedConversation, isProfileOpen } = useConversation();

    return (
        <div className='flex h-[100dvh] md:h-[90vh] w-full md:max-w-6xl rounded-none md:rounded-2xl overflow-hidden bg-white shadow-none md:shadow-2xl border-0 md:border border-gray-100'>
            <div className={`${selectedConversation ? "hidden" : "flex"} w-full md:flex md:w-auto`}>
                <Sidebar />
            </div>
            <div className={`${!selectedConversation ? "hidden" : isProfileOpen ? "hidden md:flex" : "flex"} w-full md:flex md:w-auto flex-1`}>
                <MessageContainer />
            </div>
            <div className={`${(selectedConversation && isProfileOpen) ? "flex w-full" : "hidden lg:flex"}`}>
                <RightSidebar />
            </div>
        </div>
    );
};
export default Home;
