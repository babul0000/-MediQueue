import AlertDelete from '@/components/AlertDelete';
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";
import React from 'react';
import { Calendar, Phone, Mail, User, BookOpen } from 'lucide-react';

export const metadata = {
  title: "My Bookings - MediQueue",
  description: "View and manage your booked tutor sessions.",
};

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md w-full">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
                        <div className="mb-4 flex justify-center">
                            <div className="bg-blue-100 rounded-full p-4">
                                <BookOpen className="text-blue-600" size={32} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Authentication Required</h2>
                        <p className="text-gray-600">Please log in to view your bookings.</p>
                    </div>
                </div>
            </div>
        );
    }
 const { token } = await auth.api.getToken({
        headers: await headers()
    });
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings?email=${userEmail}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const bookings = await res.json();

    if (!bookings || bookings.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md w-full">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
                        <div className="mb-4 flex justify-center">
                            <div className="bg-amber-100 rounded-full p-4">
                                <Calendar className="text-amber-600" size={32} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bookings Yet</h2>
                        <p className="text-gray-600 mb-2">You haven't booked any tutor sessions.</p>
                        <p className="text-sm text-gray-500">Start your learning journey by booking a session today!</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="text-blue-600" size={32} />
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            My Booked Sessions
                        </h1>
                    </div>
                    <p className="text-gray-600 ml-11">Manage and track all your tutor bookings</p>
                </div>

                {/* Bookings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
                    {bookings.map((book) => (
                        <div key={book._id} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden">
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1"></div>
                            
                            <div className="p-6 sm:p-8">
                                {/* Title and Tutor */}
                                <div className="mb-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{book.tutorName}</h3>
                                            <p className="text-sm text-gray-500 font-medium">Tutor Session</p>
                                        </div>
                                        <div className="bg-blue-100 rounded-full p-3">
                                            <User className="text-blue-600" size={20} />
                                        </div>
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    {/* Student Name */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Your Name</p>
                                        <p className="text-gray-900 font-semibold">{book.name}</p>
                                    </div>

                                    {/* Phone */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Phone size={14} className="text-blue-600" />
                                            <p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
                                        </div>
                                        <p className="text-gray-900 font-semibold">{book.phone}</p>
                                    </div>

                                    {/* Email */}
                                    <div className="bg-gray-50 rounded-lg p-4 sm:col-span-2">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Mail size={14} className="text-purple-600" />
                                            <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                                        </div>
                                        <p className="text-gray-900 font-semibold break-all">{book.email}</p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="flex gap-3 pt-4 border-t border-gray-100">
                                    <div className="flex-1">
                                        <AlertDelete book={book} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyBookingPage;