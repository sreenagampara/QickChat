import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import EditProfileModal from "./EditProfileModal";

const Sidebar = () => {
  const { authUser } = useAuthContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="border-r border-gray-200 p-4 flex flex-col w-full md:w-[320px] lg:w-[350px] bg-gray-50 h-full">
      {/* Profile Header */}
      <div className="flex items-center gap-3 mb-6 px-2 justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  authUser?.profileImage && !authUser.profileImage.includes("avatar.iran.liara.run")
                    ? authUser.profileImage
                    : "/images/default-avatar.png"
                }
                alt={`${authUser?.name || "User"} avatar`}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-800 text-lg truncate max-w-[150px]">
              {authUser.name}
            </span>
            <span className="text-xs text-gray-500">My Profile</span>
          </div>
        </div>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="btn btn-ghost btn-circle btn-sm text-gray-600 hover:text-blue-600"
          title="Edit Profile"
        >
          <BsPencilSquare className="w-5 h-5" />
        </button>
      </div>

      <SearchInput />
      <div className="divider px-3 my-2"></div>
      <Conversations />

      <div className="mt-auto pt-4 border-t border-gray-200">
        <LogoutButton />
      </div>

      {isEditModalOpen && (
        <EditProfileModal onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
};
export default Sidebar;
