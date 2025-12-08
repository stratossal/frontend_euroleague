// import {AuthButton} from "@/components/AuthButton.tsx";
// import {Button} from "@/components/ui/button.tsx";
// import HomePage from "@/components/pages/HomePage.tsx";
import {Link} from "react-router";
import {AuthButton} from "@/components/AuthButton.tsx";

const Header = () => {
    return (
        <header className="bg-gray-100 w-full fixed top-0 border-b border-gray-300 z-999">
            <div className="container mx-auto px-4 flex items-center justify-between">


                <div className="flex items-center gap-3 py-4">
                    <img src="/png/logo_header.svg" alt="NBA logo" className="h-8" />
                    <span className="text-xl text-gray-800 font-light tracking-wider">Analytics</span>
                </div>


                <nav className="flex gap-6 text-gray-700 absolute left-1/2 -translate-x-1/2">
                    <Link to="/" className="hover:text-orange-500 transition">Home</Link>
                    <Link to="/stats" className="hover:text-orange-500 transition">Stats</Link>
                    <Link to="/players" className="hover:text-orange-500 transition">Players</Link>
                    <Link to="/teams" className="hover:text-orange-500 transition">Teams</Link>
                </nav>


                <div className="flex items-center gap-4">
                    <AuthButton/>
                </div>
            </div>
        </header>
    );
};

export default Header;
