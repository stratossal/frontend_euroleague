import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/utils/utils.ts";

export default function AvatarDropdown() {
    const { user, logoutUser } = useAuth();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    if (!user) return null;

    const goToProfile = () => {
        setOpen(false);
        navigate("/profile");
    };

    const goToEdit = () => {
        setOpen(false);
        navigate("/profile/edit");
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setOpen(!open)}
                className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all shadow-md"
            >
                {getInitials(user.firstname, user.lastname)}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-10 z-20 animate-slide-down origin-top-right">
                    <div className="py-2 flex flex-col divide-y divide-gray-100">
                        <button
                            onClick={goToProfile} // <-- πρέπει να υπάρχει
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-150"
                        >
                            Profile
                        </button>
                        <button
                            onClick={goToEdit}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-150"
                        >
                            Edit
                        </button>
                        <button
                            onClick={logoutUser}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition duration-150 font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
