import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
    const { loading, logout } = useLogout();

    return (
        <div className='mt-auto pt-4'>
            {!loading ? (
                <BiLogOut className='w-6 h-6 text-gray-600 cursor-pointer hover:text-sky-500' onClick={logout} />
            ) : (
                <span className='loading loading-spinner'></span>
            )}
        </div>
    );
};
export default LogoutButton;
