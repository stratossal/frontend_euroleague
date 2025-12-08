import {Link, useNavigate} from "react-router";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {useForm} from "react-hook-form";
import {type User, userSchema} from "@/schemas/users.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {createUser} from "@/services/api.users.ts";
import {toast} from "sonner";

const RegisterPage = () => {

    const countries = [
        "Greece", "Spain", "Turkey", "Germany", "Italy", "France", "Serbia", "Russia",
        "Lithuania", "United States", "Canada", "Argentina", "Brazil", "Australia",
        "China", "Philippines", "United Kingdom", "Poland", "Czech Republic"
    ];
    const teams = [
        "Anadolu Efes Istanbul",
        "Real Madrid",
        "Virtus Segafredo Bologna",
        "FC Barcelona",
        "Olympiacos Piraeus",
        "Panathinaikos AKTOR",
        "AS Monaco",
        "Fenerbahçe Beko Istanbul",
        "Maccabi Playtika Tel Aviv",
        "EA7 Emporio Armani Milan",
        "Alba Berlin",
        "Partizan Mozzart Bet Belgrade",
        "Crvena Zvezda Meridianbet Belgrade",
        "Baskonia Vitoria-Gasteiz",
        "ASVEL Villeurbanne",
        "Valencia Basket",
        "Zalgiris Kaunas",
        "Bayern Munich"
    ]

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors,isSubmitting},
    } = useForm<User>({
        resolver:zodResolver(userSchema)
    })

    const onSubmit = async(data:User)=>{
        try {
            const payload = {
                ...data,
                address: {
                    area: data.area,
                    street: data.street,
                    number: data.number,
                    po: data.po,
                    municipality: data.municipality
                }
            };
            await createUser(payload);
            toast.success("Register Successfully");
            navigate("/login");
        }catch(error){
            toast.error(
                error instanceof Error ? error.message : "Register failed"
            )
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
            >
                <div className="min-h-screen bg-gray-900 relative overflow-x-hidden py-8 md:py-16 pt-24">
                    <img
                        src="/png/field.jpg"
                        alt="Basketball Background"
                        className="absolute inset-0 w-full h-full object-cover bg-blur"
                        style={{ zIndex: 0 }}
                    />
                    <div className="w-full flex justify-center px-4">
                        <div className="w-full max-w-md rounded-2xl bg-black bg-opacity-40 backdrop-blur-md p-6 md:p-8 shadow-2xl text-white">
                            <h1 className="text-3xl md:text-4xl font-semibold text-center mb-8">Register</h1>
                            <div className="space-y-4 mb-6">

                                <Input type="text" placeholder="First Name" {...register("firstname")} />
                                {errors.firstname && (
                                    <p className="text-red-400 text-sm">{errors.firstname.message}</p>
                                )}

                                <Input type="text" placeholder="Last Name" {...register("lastname")} />
                                {errors.lastname && (
                                    <p className="text-red-400 text-sm">{errors.lastname.message}</p>
                                )}

                                <Input type="email" placeholder="Email" {...register("email")} />
                                {errors.email && (
                                    <p className="text-red-400 text-sm">{errors.email.message}</p>
                                )}

                                <Select
                                    onValueChange={(value) => {
                                        setValue("country", value);
                                    }}
                                >
                                    <SelectTrigger className="w-full bg-transparent text-white border border-white/20">
                                        <SelectValue placeholder="Select Country" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-900 text-white border border-white/20">
                                        {countries.map((country) => (
                                            <SelectItem
                                                key={country}
                                                value={country}
                                                className="focus:bg-gray-700"
                                            >
                                                {country}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.country && (
                                    <p className="text-red-400 text-sm">{errors.country.message}</p>
                                )}

                                <Input type="text" placeholder="Area" {...register("area")} />
                                {errors.area && (
                                    <p className="text-red-400 text-sm">{errors.area.message}</p>
                                )}

                                <Input type="text" placeholder="Street" {...register("street")} />
                                {errors.street && (
                                    <p className="text-red-400 text-sm">{errors.street.message}</p>
                                )}

                                <Input type="text" placeholder="Number" {...register("number")} />
                                {errors.number && (
                                    <p className="text-red-400 text-sm">{errors.number.message}</p>
                                )}

                                <Input type="text" placeholder="PO" {...register("po")} />
                                {errors.po && (
                                    <p className="text-red-400 text-sm">{errors.po.message}</p>
                                )}

                                <Input type="text" placeholder="Municipality" {...register("municipality")} />
                                {errors.municipality && (
                                    <p className="text-red-400 text-sm">{errors.municipality.message}</p>
                                )}

                                <Input type="text" placeholder="Phone" {...register("phone")} />
                                {errors.phone && (
                                    <p className="text-red-400 text-sm">{errors.phone.message}</p>
                                )}

                                <Select
                                    onValueChange={(value) => {
                                        setValue("favTeam", value);
                                    }}
                                >
                                    <SelectTrigger className="w-full bg-transparent text-white border border-white/20">
                                        <SelectValue placeholder="Select your Favourite Team" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-900 text-white border border-white/20">
                                        {teams.map((team) => (
                                            <SelectItem
                                                key={team}
                                                value={team}
                                                className="focus:bg-gray-700"
                                            >
                                                {team}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.favTeam && (
                                    <p className="text-red-400 text-sm">{errors.favTeam.message}</p>
                                )}

                                <Input type="password" placeholder="Password" {...register("password")} />
                                {errors.password && (
                                    <p className="text-red-400 text-sm">{errors.password.message}</p>
                                )}

                                <Input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
                                {errors.confirmPassword && (
                                    <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>
                                )}
                            </div>

                            <div className="flex justify-center">
                                <Button className="w-full max-w-xs"
                                        disabled={isSubmitting}
                                        type="submit"
                                >{isSubmitting? "Register..." : "Register"}</Button>
                            </div>

                            <div className="text-center text-sm text-white/70 pt-6">
                                Already have an account? <Link to="/login" className="underline">Login here</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default RegisterPage;
