import { Link } from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden pt-24">
            <img
                src="/png/field.jpg"
                alt="Basketball Background"
                className="absolute inset-0 w-full h-full object-cover bg-blur"
                style={{ zIndex: 0 }}
            />

            <div
                className="relative z-10 w-full max-w-md mx-4 rounded-2xl bg-black bg-opacity-40 backdrop-blur-md p-8 shadow-2xl text-white"
                role="form"
                aria-label="Login form"
            >
                <h1 className="text-3xl md:text-4xl font-semibold text-center mb-8">
                    Login
                </h1>

                <div className="space-y-4 mb-6">
                    <Input type="text" placeholder="Email" />
                    <Input type="password" placeholder="Password" />
                </div>

                <div className="flex justify-center">
                    <Button className="w-full max-w-xs">JOIN US</Button>
                </div>

                <div className="mt-6 text-center text-sm text-white/70">
                    New user?
                    <Link to="/register" className="underline ml-1">Create an account</Link>
                </div>
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"
                style={{ zIndex: 5 }}
            ></div>
        </div>
    );
};

export default LoginPage;