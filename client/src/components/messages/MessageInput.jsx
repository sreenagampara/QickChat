import { useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { BsImage } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import usePreviewImg from "../../hooks/usePreviewImg";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();
    const { imgUrl, setImgUrl, handleImageChange } = usePreviewImg();
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message && !imgUrl) {
            return;
        }
        await sendMessage(message, imgUrl); // Update hook to accept image
        setMessage("");
        setImgUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            {/* Image Preview */}
            {imgUrl && (
                <div className="relative w-20 h-20 mb-2">
                    <img src={imgUrl} alt="Preview" className="w-full h-full object-cover rounded-lg border border-gray-600" />
                    <button className="absolute -top-2 -right-2 bg-gray-600 rounded-full text-white w-5 h-5 flex items-center justify-center text-xs"
                        onClick={() => { setImgUrl(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}>X</button>
                </div>
            )}

            <div className='w-full relative'>
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5 bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-24'
                    placeholder='Send a message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <div className='absolute inset-y-0 right-0 flex items-center pr-2 gap-1'>
                    <input
                        type="file"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                    />

                    <button
                        type="button"
                        className=" cursor-pointer btn btn-circle btn-sm btn-ghost hover:bg-gray-200 text-gray-600"
                        onClick={() => fileInputRef.current.click()}
                        title="Upload Image"
                    >
                        <BsImage className="w-5 h-5" />
                    </button>

                    <button type='submit' className='cursor-pointer btn btn-circle btn-sm btn-ghost text-blue-500 hover:bg-blue-100'>
                        {loading ? <div className='loading loading-spinner'></div> : <BsSend className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </form>
    );
};
export default MessageInput;
