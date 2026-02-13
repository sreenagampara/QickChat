import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";


const Conversations = () => {
    const { loading, conversations } = useGetConversations();

    return (
        <div className='py-2 flex flex-col overflow-auto no-scrollbar flex-1'>
            {conversations.map((conversation, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    lastIdx={idx === conversations.length - 1}
                />
            ))}

            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    );
};
export default Conversations;

// Simple random emoji generator helper inline if not separate file
// function getRandomEmoji() {
//    const emojis = ["🙂", "🤗", "😎", "🤓", "🤖", "👻", "👽", "💩", "🦄", "🌈"];
//    return emojis[Math.floor(Math.random() * emojis.length)];
// }
