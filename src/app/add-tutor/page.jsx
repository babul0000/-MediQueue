"use client";
import React, { useState } from 'react';
import { useSession } from "@/lib/auth-client";
import toast from 'react-hot-toast';

const AddTutorForm = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const formEntries = Object.fromEntries(formData.entries());


        const tutorData = {
            ...formEntries,
            hourlyFee: Number(formEntries.hourlyFee),
            totalSlot: Number(formEntries.totalSlot),
            email: session?.user?.email,
            createdAt: new Date().toISOString(),
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-tutor`, {
                cache: "no-store",
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(tutorData)
            });

            const data = await res.json();
            
            if (res.ok) {
                toast.success("Tutor added successfully!");
                e.target.reset();
            } else {
                toast.error(data.message || "Failed to add tutor!");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-7/12 mx-auto my-10 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Add New Tutor</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">Tutor Name</label>
                        <input type="text" name="tutorName" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-gray-400 outline-none text-sm" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">Photo URL</label>
                        <input type="url" name="photoUrl" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-gray-400 outline-none text-sm" required />
                    </div>
                </div>


                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">Subject</label>
                        <select name="subject" defaultValue="" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl outline-none text-sm bg-white" required>
                            <option value="" disabled>Select Subject</option>
                            <option value="English">English</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Physics">Physics</option>
                            <option value="ICT">ICT</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">Teaching Mode</label>
                        <select name="teachingMode" defaultValue="" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl outline-none text-sm bg-white" required>
                            <option value="" disabled>Select Mode</option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                </div>


                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">Available Days & Time</label>
                        <input type="text" name="availableDaysTime" placeholder="Sun - Thu 5:00 PM - 8:00 PM" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl outline-none text-sm" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">Hourly Fee</label>
                        <input type="number" name="hourlyFee" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl outline-none text-sm" required />
                    </div>
                </div>


                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">Total Slot</label>
                        <input type="number" name="totalSlot" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl outline-none text-sm" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">Session Start Date</label>
                        <input type="date" name="startDate" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl outline-none text-sm" required />
                    </div>
                </div>


                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">Institution</label>
                        <input type="text" name="institution" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl outline-none text-sm" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">Location</label>
                        <input type="text" name="location" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl outline-none text-sm" required />
                    </div>
                </div>


                <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Experience</label>
                    <textarea name="experience" rows="3" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl outline-none text-sm resize-none" required></textarea>
                </div>


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition disabled:bg-gray-400"
                >
                    {loading ? "Submitting..." : "Submit Tutor"}
                </button>
            </form>
        </div>
    );
};

export default AddTutorForm;