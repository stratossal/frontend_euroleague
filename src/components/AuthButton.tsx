import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/hooks/useAuth.ts";
import {Link, useNavigate} from "react-router";

export function AuthButton() {

    const {logoutUser,isAuthenticated} = useAuth()
    const navigate = useNavigate();

    const handleLogout = ()=>{
        logoutUser()
    }
    const handleLogin = ()=>{
        navigate("/login")
    }

    return isAuthenticated ? (
        <>
            <Button onClick={handleLogout}>
                Logout
            </Button>
        </>
    ) : (
        <>
            <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-700 hover:text-orange-500 transition py-2">Login</Link>
                <Link to="/register">
                    <Button onClick={handleLogin} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition">
                        Register
                    </Button>
                </Link>
            </div>
        </>
    )
}