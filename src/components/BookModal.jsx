"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Modal, TextField } from "@heroui/react";
import toast from "react-hot-toast";

export function BookingModal({ data }) {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const isSlotAvailable = data?.totalSlot > 0;

    const handleForm = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const booking = Object.fromEntries(formData.entries());
        
        booking.tutorName = data?.tutorName; 

        try {
            const res = await fetch(`http://localhost:5000/add-booking`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(booking)
            });
            
            const responseData = await res.json();
            
            if (res.ok) {
                toast.success("Your booking has been confirmed successfully!");
                e.target.reset(); 

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                
            } else {
                toast.error(responseData.message || "Failed to confirm booking.");
            }

        } catch (error) {
            console.error("Error adding booking:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    if (isPending) {
        return <Button variant="secondary" isLoading>Loading...</Button>;
    }

    return (
        <Modal>
            <Button variant="secondary" disabled={!isSlotAvailable}>
                {isSlotAvailable ? "Book Session" : "Fully Booked"}
            </Button>
            
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md bg-white rounded-2xl p-8 shadow-xl">
                        <Modal.CloseTrigger />

                        <Modal.Header className="text-center flex flex-col items-center">
                            <Modal.Heading className="text-xl font-bold text-gray-900">Book Session</Modal.Heading>
                            <p className="mt-1 text-sm leading-5 text-gray-500 max-w-xs">
                                Review your details and confirm your booking session below.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="mt-6">
                            <form onSubmit={handleForm} className="flex flex-col gap-7">
                                
                                <input type="hidden" name="tutorId" value={data?._id || ""} />

                                <TextField 
                                    className="w-full flex flex-col gap-1.5" 
                                    name="name" 
                                    type="text"
                                    defaultValue={user?.name || ""}
                                >
                                    <Label className="text-sm font-medium text-gray-700">Name</Label>
                                    <Input
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="Enter Your Name"
                                        required
                                    />
                                </TextField>

                                <TextField className="w-full flex flex-col gap-1.5" name="phone" type="tel">
                                    <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                                    <Input
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="017XX-XXXXXX"
                                        required
                                    />
                                </TextField>

                                <TextField 
                                    className="w-full flex flex-col gap-1.5" 
                                    name="tutorName" 
                                    type="text"
                                    defaultValue={data?.tutorName || ""}
                                >
                                    <Label className="text-sm font-medium text-gray-700">Tutor Name</Label>
                                    <Input
                                        className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed"
                                        readOnly
                                    />
                                </TextField>

                                <TextField 
                                    className="w-full flex flex-col gap-1.5" 
                                    name="email" 
                                    type="email"
                                    defaultValue={user?.email || ""}
                                >
                                    <Label className="text-sm font-medium text-gray-700">Email</Label>
                                    <Input
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="enteryourgamil@gmail.com"
                                        readOnly
                                    />
                                </TextField>

                                <div className="flex justify-end gap-3 mt-4">
                                    <Button
                                        slot="close"
                                        variant="secondary"
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={!isSlotAvailable}
                                        className="px-4 py-2 bg-[#009688] text-white rounded-lg text-sm font-medium hover:bg-[#00796b]"
                                    >
                                        Confirm Booking
                                    </Button>
                                </div>

                            </form>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}