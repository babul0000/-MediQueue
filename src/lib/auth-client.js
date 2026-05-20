import { createAuthClient } from "better-auth/react";

// একবারে সব কনফিগারেশন করুন
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000"
});

// এখান থেকেই সবকিছু এক্সপোর্ট করুন
export const { signIn, signUp, useSession } = authClient;