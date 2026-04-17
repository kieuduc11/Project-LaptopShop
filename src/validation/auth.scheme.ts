import {z} from "zod";
import { isExistingUser } from "services/client/auth.service";

const emailSchema = z.string().email("Invalid email address").refine(async (email) => {
    return !(await isExistingUser(email));
}, {
    message: "Email is already existing",
    path: ["email"],
});

const passwordSchema = z.string().trim().min(6, "Password must be at least 6 characters long");

const registerSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: passwordSchema,
}).refine((data) => {
    return data.password === data.passwordConfirm;
}, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
}); 

export type TRegisterSchema = z.infer<typeof registerSchema>;

export { registerSchema };