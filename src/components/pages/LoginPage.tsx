import {Link, useNavigate} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {loginSchema, type LoginUser} from "@/schemas/login.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {login} from "@/services/api.login.ts";
import {toast} from "sonner";

const LoginPage = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<LoginUser>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginUser) => {
        try {
            await login(data.email, data.password);
            toast.success("Login successfully");
            navigate("/teams")
        }catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Login Failed"
            )
        }
    }
    return (
        <>
            <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            >
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
                    <Input type="text"
                           placeholder="Email"
                           {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-400 text-sm">{errors.email.message}</p>
                    )}

                    <Input type="password"
                           placeholder="Password"
                           {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-red-400 text-sm">{errors.password.message}</p>
                    )}
                </div>

                <div className="flex justify-center">
                    <Button
                        className="w-full max-w-xs"
                        disabled={isSubmitting}
                        type="submit"
                    >{isSubmitting ? "Logging in..." : "JOIN US"}</Button>
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
            </form>
        </>
    );
};

export default LoginPage;