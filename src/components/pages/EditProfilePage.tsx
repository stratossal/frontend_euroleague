import { Input } from "@/components/ui/input.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type User } from "@/schemas/users.ts";
import { useAuth } from "@/hooks/useAuth.ts";
import { useEffect } from "react";
import { updateUser } from "@/services/api.users.ts";
import { toast } from "sonner";
import {useNavigate} from "react-router";
import {z} from "zod"

export const editProfileSchema = userSchema
    .partial()
    .refine(
        data => !data.password || data.password === data.confirmPassword,
        { message: "Passwords do not match", path: ["confirmPassword"] }
    );

export type EditProfileForm = z.infer<typeof editProfileSchema>;


const EditProfilePage = () => {
    const { user, accessToken, setUser } = useAuth();

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EditProfileForm>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            country: "",
            phone: "",
            favTeam: "",
            area: "",
            street: "",
            number: "",
            po: "",
            municipality: "",
            password: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        if (!user) return;

        reset({
            firstname: user.firstname,
            lastname: user.lastname,
            country: user.country,
            phone: user.phone,
            favTeam: user.favTeam,
                area: user.area || "",
                street: user.street || "",
                number: user.number || "",
                po: user.po || "",
                municipality: user.municipality || "",
            password: "",
            confirmPassword: "",
        });
    }, [user, reset]);
    const navigate = useNavigate();


    const onSubmit = async (data: EditProfileForm) => {
        if (!user || !accessToken) return;

        try {
            const payload: Partial<User> = {
                firstname: data.firstname,
                lastname: data.lastname,
                country: data.country,
                phone: data.phone,
                favTeam: data.favTeam,
                area: data.area,
                street: data.street,
                number: data.number,
                po: data.po,
                municipality: data.municipality,
                ...(data.password ? { password: data.password } : {}),
            };


            await updateUser((user as User & { _id: string })._id, payload, accessToken);
            const newUser = {
                ...user,
                ...payload
            };

            setUser(newUser);
            localStorage.setItem("user", JSON.stringify(newUser));

            toast.success("Profile updated successfully");
            navigate("/");

        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Update failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 md:p-12">
            <h1 className=" pt-10 text-3xl md:text-4xl font-bold text-center text-white mb-8 py-4 rounded-xl shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Edit Profile
            </h1>

            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Input placeholder="First name" {...register("firstname")} />
                            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
                        </div>

                        <div>
                            <Input placeholder="Last name" {...register("lastname")} />
                            {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
                        </div>

                        <div>
                            <Input placeholder="Country" {...register("country")} />
                            {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                        </div>

                        <div>
                            <Input placeholder="Phone" {...register("phone")} />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <Input placeholder="Favorite Team" {...register("favTeam")} />
                            {errors.favTeam && <p className="text-red-500 text-sm">{errors.favTeam.message}</p>}
                        </div>

                        <div>
                            <Input placeholder="Area" {...register("area")} />
                        </div>

                        <div>
                            <Input placeholder="Street" {...register("street")} />
                        </div>

                        <div>
                            <Input placeholder="Number" {...register("number")} />
                        </div>

                        <div>
                            <Input placeholder="Postal Code" {...register("po")} />
                        </div>

                        <div>
                            <Input placeholder="Municipality" {...register("municipality")} />
                        </div>

                        <div>
                            <Input type="password" placeholder="New password" {...register("password")} />
                        </div>

                        <div>
                            <Input type="password" placeholder="Confirm password" {...register("confirmPassword")} />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl shadow-lg transition"
                    >
                        {isSubmitting ? "Saving..." : "Save changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePage;
