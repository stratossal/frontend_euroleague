import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/hooks/useAuth.ts";
import {Link, useLocation} from "react-router";

export default function AvatarDropdown() {

    const {logoutUser} = useAuth();
    const [open,setOpen] = useState(false);
    const location = useLocation();
    const handleChange = ()=>{
        setOpen((prev) => !prev);
    }
    const handleClose = () => {
        logoutUser()
    }
    useEffect(() => {
        setOpen(false)
    }, [location.pathname]);

    return (
        <>
            <div className="relative">
                <Stack direction="row" spacing={2}>
                    <Avatar src="/broken-image.jpg"
                            onClick={handleChange}
                            className="cursor-pointer"
                    />
                 </Stack>
                {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg p-2 flex flex-col gap-1">
                        <Button
                            variant="ghost"
                            className="justify-start w-full text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                        >
                            <Link to="/profile">Profile</Link>
                        </Button>
                        <Button
                            variant="ghost"
                            className="justify-start w-full text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                        >
                            Settings
                        </Button>
                        <Button
                            variant="destructive"
                            className="justify-start w-full px-3 py-2 rounded-md"
                            onClick={handleClose}
                        >
                            Logout
                        </Button>
                    </div>
                )}
          </div>
        </>
    );
}
