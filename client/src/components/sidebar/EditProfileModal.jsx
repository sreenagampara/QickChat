import { useState, useRef } from "react";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import usePreviewImg from "../../hooks/usePreviewImg";
import { useAuthContext } from "../../context/AuthContext";
import { BsCamera } from "react-icons/bs";

const EditProfileModal = ({ onClose }) => {
    const { authUser } = useAuthContext();
    const [name, setName] = useState(authUser.name);
    const { loading, updateProfile } = useUpdateProfile();
    const { imgUrl, setImgUrl, handleImageChange } = usePreviewImg();
    const fileRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // If no new image selected, imgUrl is null.
        // If image selected, imgUrl is base64 string.
        // We pass what we have. API handles partial updates.

        await updateProfile({ name, profileImage: imgUrl });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Profile</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Image Upload */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative group cursor-pointer" onClick={() => fileRef.current.click()}>
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                                    <img src={imgUrl || (authUser.profileImage && !authUser.profileImage.includes("avatar.iran.liara.run") ? authUser.profileImage : null)} alt="Profile" className="object-cover w-full h-full" />
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <BsCamera className="text-white w-8 h-8" />
                            </div>
                        </div>
                        <input
                            type="file"
                            hidden
                            ref={fileRef}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        <span className="text-xs text-gray-500">Click to change avatar</span>
                    </div>

                    {/* Name Input */}
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Full Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full input input-bordered h-10 bg-gray-50 border-gray-300 text-gray-900"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            className="btn btn-sm btn-ghost"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-sm btn-primary"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
