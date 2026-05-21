"use client";

import { useState } from "react";
import { Check } from "@gravity-ui/icons";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";

import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUpPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            const formData = new FormData(e.currentTarget);

            const user = Object.fromEntries(formData.entries());

            const { data, error } = await authClient.signUp.email({
                name: user.name,
                email: user.email,
                password: user.password,
                image: user.image || "",
            });

            if (error) {
                setErrorMsg(error.message || "Something went wrong");
                setLoading(false);
                return;
            }

            if (data?.user) {
                router.push("/login");
            }
        } catch (err) {
            setErrorMsg("Unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            // future implementation (depends on auth provider)
            // await authClient.signIn.social({ provider: "google" });

            console.log("Google signup clicked");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-4/12 mx-auto my-10 border p-8 bg-white shadow-sm rounded-lg">

            {/* Heading */}
            <div className="text-center mb-5">
                <h1 className="text-5xl font-light">Create Account</h1>
                <p className="text-gray-500 mt-2 text-lg">
                    Start your adventure with Wanderlust
                </p>
                <div className="w-10 h-1 bg-pink-500 mx-auto mt-4 rounded"></div>
            </div>

            {/* Error Message */}
            {errorMsg && (
                <p className="text-red-500 text-center mb-3">
                    {errorMsg}
                </p>
            )}

            {/* Form */}
            <Form
                className="flex flex-col gap-4"
                onSubmit={onSubmit}
            >

                {/* Name */}
                <TextField
                    isRequired
                    name="name"
                    type="text"
                    validate={(value) =>
                        value.length < 3
                            ? "Name must be at least 3 characters"
                            : null
                    }
                >
                    <Label>Full Name</Label>
                    <Input placeholder="Enter your full name" />
                    <FieldError />
                </TextField>

                {/* Image */}
                <TextField name="image" type="url">
                    <Label>Image URL</Label>
                    <Input placeholder="Enter your image URL (optional)" />
                    <FieldError />
                </TextField>

                {/* Email */}
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) =>
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                            ? null
                            : "Enter a valid email"
                    }
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                {/* Password */}
                <TextField
                    isRequired
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8)
                            return "At least 8 characters";
                        if (!/[A-Z]/.test(value))
                            return "Need 1 uppercase letter";
                        if (!/[0-9]/.test(value))
                            return "Need 1 number";
                        return null;
                    }}
                >
                    <Label>Password</Label>

                    <Input placeholder="Enter your password" />

                    <Description>
                        8+ chars, 1 uppercase, 1 number
                    </Description>

                    <FieldError />
                </TextField>

                {/* Submit */}
                <div className="flex flex-col gap-3 w-full mt-2">

                    <Button
                        type="submit"
                        className="w-full"
                        isDisabled={loading}
                    >
                        <Check />
                        {loading ? "Creating..." : "Create Account"}
                    </Button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 w-full">
                        <div className="flex-1 h-[1px] bg-gray-300"></div>
                        <p className="text-gray-500 text-sm">
                            Or sign up with
                        </p>
                        <div className="flex-1 h-[1px] bg-gray-300"></div>
                    </div>

                    {/* Google */}
                    <Button
                        type="button"
                        variant="secondary"
                        className="w-full"
                        onClick={handleGoogleSignUp}
                    >
                        <FcGoogle size={20} />
                        Sign Up With Google
                    </Button>
                </div>

                {/* Login */}
                <p className="text-center text-gray-500 w-full mt-3">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-cyan-500 font-medium hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

            </Form>
        </div>
    );
};

export default SignUpPage;