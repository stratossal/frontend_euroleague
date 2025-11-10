import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {Outlet} from "react-router";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}
export default Layout;