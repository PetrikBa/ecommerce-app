import z from "zod";

export interface CustomJwtSessionClaims {
    metadata?: {
        role?: "user" | "admin";
    };
}

export const UserFormSchema = z.object({
  firstName: z.string({}).min(2, "First name must be at least 2 characters long").max(50, "First name must be less than 50 characters long"),
  lastName: z.string({}).min(2, "Last name must be at least 2 characters long").max(50, "Last name must be less than 50 characters long"),
  userName: z.string({}).min(2, "Username must be at least 2 characters long").max(30, "Username must be less than 30 characters long"),
  emailAddress: z.array(z.string({message: "Email is requrired"})),
  password: z.string({}).min(8, "Password must be at least 8 characters long").max(30, "Password must be less than 30 characters long"),
})