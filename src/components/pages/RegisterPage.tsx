import { Link } from "react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const RegisterPage = () => {
    const [country, setCountry] = useState("");

    const countries = [
        "Greece", "Spain", "Turkey", "Germany", "Italy", "France", "Serbia", "Russia",
        "Lithuania", "United States", "Canada", "Argentina", "Brazil", "Australia",
        "China", "Philippines", "United Kingdom", "Poland", "Czech Republic"
    ];

    return (
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

                        <Input type="text" placeholder="First Name" />

                        <Input type="text" placeholder="Last Name" />

                        <Input type="email" placeholder="Email" />

                        <Select value={country} onValueChange={setCountry}>
                            <SelectTrigger className="w-full bg-transparent text-white border border-white/20 focus:ring-2 focus:ring-white/20">
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

                        <Input type="text" placeholder="Area"/>

                        <Input type="text" placeholder="Street"/>

                        <Input type="text" placeholder="Number"/>

                        <Input type="text" placeholder="PO"/>

                        <Input type="text" placeholder="Municipality"/>

                        <Input type="text" placeholder="Phone"/>

                        <Input type="password" placeholder="Password" />


                        <Input type="password" placeholder="Confirm Password" />
                    </div>


                    <div className="flex justify-center">
                        <Button className="w-full max-w-xs">CREATE ACCOUNT</Button>
                    </div>

                    <div className="text-center text-sm text-white/70 pt-6">
                        Already have an account? <Link to="/login" className="underline">Login here</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;