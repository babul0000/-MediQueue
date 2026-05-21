"use client";
import React, { useState } from 'react';
import { useSession } from "@/lib/auth-client";
import toast from 'react-hot-toast';
import { BookOpen, User, FileText } from 'lucide-react';

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-blue-100 rounded-full p-3">
                            <BookOpen className="text-blue-600" size={32} />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Add New Tutor
                        </h1>
                    </div>
                    <p className="text-gray-600 ml-16 text-sm sm:text-base">Register yourself as a tutor and start teaching</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                    {/* Gradient Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1"></div>

                    <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                        {/* Section 1: Basic Information */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <User size={20} className="text-blue-600" />
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm">Tutor Name *</label>
                                    <input type="text" name="tutorName" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition" placeholder="Enter your name" required />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm">Photo URL *</label>
                                    <input type="url" name="photoUrl" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition" placeholder="https://example.com/photo.jpg" required />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Teaching Details */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <BookOpen size={20} className="text-purple-600" />
                                Teaching Details
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm">Subject *</label>
                                    <select name="subject" defaultValue="" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-white transition" required>
                                        <option value="" disabled>Select Subject</option>
                                        <option value="English">English</option>
                                        <option value="Mathematics">Mathematics</option>
                                        <option value="Physics">Physics</option>
                                        <option value="ICT">ICT</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm">Teaching Mode *</label>
                                    <select name="teachingMode" defaultValue="" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-white transition" required>
                                        <option value="" disabled>Select Mode</option>
                                        <option value="Online">Online</option>
                                        <option value="Offline">Offline</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Schedule & Fees */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <FileText size={20} className="text-green-600" />
                                Schedule & Pricing
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2 text-sm">Available Days & Time *</label>
                                    <input type="text" name="availableDaysTime" placeholder="e.g., Sun - Thu 5:00 PM - 8:00 PM" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition" required />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm">Hourly Fee (৳) *</label>
                                    <input type="number" name="hourlyFee" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition" placeholder="500" required />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm">Total Slots *</label>
                                    <input type="number" name="totalSlot" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition" placeholder="10" required />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm">Session Start Date *</label>
                                    <input type="date" name="startDate" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition" required />
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Location Details */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <BookOpen size={20} className="text-orange-600" />
                                Location & Institution
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm">Institution *</label>
                                    <input type="text" name="institution" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition" placeholder="e.g., Oxford University" required />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm">Location *</label>
                                    <input type="text" name="location" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition" placeholder="e.g., Dhaka, Bangladesh" required />
                                </div>
                            </div>
                        </div>

                        {/* Section 5: Experience */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Experience</h3>
                            <label className="block text-gray-700 font-medium mb-2 text-sm">Experience & Bio *</label>
                            <textarea name="experience" rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm resize-none transition" placeholder="Tell students about your experience, qualifications, and teaching approach..." required></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-base"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : (
                                "Register as Tutor"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTutorForm;