import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/utils/utils.ts"

export default function AvatarDropdown() {
    const { user, logoutUser } = useAuth();
    const [open, setOpen] = useState(false);

    if (!user) return null;

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setOpen(!open)}
                className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
                {getInitials(user.firstname, user.lastname)}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Profile
                        </button>
                        <button
                            onClick={logoutUser}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
