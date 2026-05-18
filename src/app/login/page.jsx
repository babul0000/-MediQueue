"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { redirect } from "next/navigation";
import { BsGoogle } from "react-icons/bs";

const LoginPage = () => {

    
    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())
        console.log(user);
        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        })
        if (data) {
            redirect('/')
        }
        if (error) {
            alert('invalid user')
        }
        // console.log(data, error);

        

    }

    const handleGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    };

    
        
        return (
            <div className="w-4/12 mx-auto my-15 border-1 shadow-md p-8 rounded-md">
                <Form
                    className="flex  flex-col gap-5"
                    render={(props) => <form {...props} data-custom="foo" />}
                    onSubmit={onSubmit}
                >
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>
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
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="">
                        <Button className="w-full" type="submit">
                            <Check />
                            Login
                        </Button>

                        <h1 className="my-3 text-center text-gray-500">OR</h1>



                    </div>
                </Form>
                <button 
                    onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-2 text-blue-600" >
                    <BsGoogle></BsGoogle>
                    Login Wite Google
                </button>
            </div>
        );
    };

    export default LoginPage;