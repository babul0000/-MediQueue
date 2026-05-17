"use client";

import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

export function BookingModal({ data }) {
    console.log(data);

    const handleForm = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const booking = Object.fromEntries(formData.entries())

        const res = await fetch(`http://localhost:5000/add-booking`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        });
        const data = await res.json()
        console.log(data);

    }

    return (
        <Modal>
            <Button variant="secondary">Book Session</Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md bg-white rounded-2xl p-8 shadow-xl">
                        <Modal.CloseTrigger />

                        {/* Header Section */}
                        <Modal.Header className="text-center flex flex-col items-center">
                            <Modal.Heading className="text-xl font-bold text-gray-900">Book Session</Modal.Heading>
                            <p className="mt-1 text-sm leading-5 text-gray-500 max-w-xs">
                                Make changes to your profile here. Click save when you're done.
                            </p>
                        </Modal.Header>

                        {/* Body Form Section */}
                        <Modal.Body className="mt-6">
                            <form onSubmit={handleForm} className="flex flex-col gap-7">
                                {/* Name Field */}
                                <TextField className="w-full flex flex-col gap-1.5" name="name" type="text">
                                    <Label className="text-sm font-medium text-gray-700">Name</Label>
                                    <Input
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="Enter Your Name"
                                    />
                                </TextField>

                                {/* Phone Number Field */}
                                <TextField className="w-full flex flex-col gap-1.5" name="phone" type="tel">
                                    <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                                    <Input
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="017XX-XXXXXX"
                                    />
                                </TextField>

                                {/* Tutor Name Field */}
                                <TextField className="w-full flex flex-col gap-1.5" name="tutorName" type="text">
                                    <Label className="text-sm font-medium text-gray-700">Tutor Name</Label>
                                    <Input
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder={data.tutorName}
                                    />
                                </TextField>

                                {/* Email Field */}
                                <TextField className="w-full flex flex-col gap-1.5" name="email" type="email">
                                    <Label className="text-sm font-medium text-gray-700">Email</Label>
                                    <Input
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="enteryourgamil@gmail.com"
                                    />
                                </TextField>

                                <div>
                                    <Button
                                        slot="close"
                                        variant="secondary"
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        // slot="close" 
                                        className="px-4 py-2 bg-[#009688] text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                                    >
                                        Confirm Booking
                                    </Button>
                                </div>

                            </form>
                        </Modal.Body>

                        {/* Footer Buttons Section */}

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}