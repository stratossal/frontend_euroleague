import { z } from "zod";

export const userSchema = z.object({
    id: z.coerce.number().int,
    firstname: z.string().min(2, "First name must be at least 2 characters"),
    lastname: z.string().min(2, "Last name must be at least 2 characters"),

    email: z.email("Invalid email"),

    country: z.string().min(2, "Please select a country"),

    area: z.string().optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    po: z.string().optional(),
    municipality: z.string().optional(),

    phone: z.string().min(5, "Phone must be at least 5 digits"),

    favTeam: z.string().min(2, "Please select a favorite team"),

    password: z.string().min(5, "Password must be at least 5 characters"),

    confirmPassword: z.string().min(5, "Password must be at least 5 characters")
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export type User = z.infer<typeof userSchema>
