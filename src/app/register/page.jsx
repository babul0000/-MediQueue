"use client";

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

// import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


const SingUpPage = () => {
const router = useRouter()
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = Object.fromEntries(formData.entries());

        console.log(user);

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
            image: user.image,
        });
console.log(data);

        if (data.user) {
            router.push('/login')
        }

        if (error) {
            // alert("Failed to create account");
            console.log(error);
            
        }
    };

    return (
        <div className="w-4/12 mx-auto my-10 border p-8 bg-white shadow-sm rounded-lg">

            {/* Heading */}
            <div className="text-center mb-5">
                <h1 className="text-5xl font-light">
                    Create Account
                </h1>

                <p className="text-gray-500 mt-2 text-lg">
                    Start your adventure with Wanderlust
                </p>

                <div className="w-10 h-1 bg-pink-500 mx-auto mt-4 rounded"></div>
            </div>

            {/* Form */}
            <Form
                className="flex flex-col gap-4"
                render={(props) => (
                    <form {...props} data-custom="foo" />
                )}
                onSubmit={onSubmit}
            >

                {/* Name */}
                <TextField
                    isRequired
                    name="name"
                    type="text"
                    validate={(value) => {
                        if (value.length < 3) {
                            return "Name must be at least 3 characters";
                        }

                        return null;
                    }}
                >
                    <Label>Full Name</Label>

                    <Input placeholder="Enter your full name" />

                    <FieldError />
                </TextField>

                {/* Image URL */}
                <TextField
                    
                    name="image"
                    type="url"
                    
                >
                    <Label>Image URL</Label>

                    <Input placeholder="Enter Your Image URL" />

                    <FieldError />
                </TextField>

                {/* Email */}
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                        ) {
                            return "Please enter a valid email address";
                        }

                        return null;
                    }}
                >
                    <Label>Email</Label>

                    <Input placeholder="john@example.com" />

                    <FieldError />
                </TextField>

                {/* Password */}
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {

                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }

                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }

                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }

                        return null;
                    }}
                >
                    <Label>Password</Label>

                    <Input placeholder="Enter your password" />

                    <Description>
                        Must be at least 8 characters with 1 uppercase and 1 number
                    </Description>

                    <FieldError />
                </TextField>

                {/* Submit Buttons */}
                <div className="flex flex-col gap-3 w-full mt-2">

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        <Check />
                        Create Account
                    </Button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 w-full">
                        <div className="flex-1 h-[1px] bg-gray-300"></div>

                        <p className="text-gray-500 text-sm whitespace-nowrap">
                            Or sign up with
                        </p>

                        <div className="flex-1 h-[1px] bg-gray-300"></div>
                    </div>

                    {/* Google */}
                    <Button
                        type="button"
                        variant="secondary"
                        className="w-full"
                    >
                        <FcGoogle size={20} />
                        Sign Up With Google
                    </Button>
                </div>

                {/* Login */}
                <p className="text-center text-gray-500 w-full mt-3">
                    Already have an account?{" "}

                    <span className="text-cyan-500 font-medium cursor-pointer hover:underline">
                        Sign In
                    </span>
                </p>

            </Form>
        </div>
    );
};

export default SingUpPage;