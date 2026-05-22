import AlertDelete from '@/components/AlertDelete';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from 'react';
import { BookOpen, Calendar, Phone, Mail, User, Trash2 } from 'lucide-react';

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
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 text-center max-w-md w-full">
                    <div className="bg-blue-100 rounded-full p-4 w-fit mx-auto mb-4">
                        <BookOpen className="text-blue-600" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Authentication Required</h2>
                    <p className="text-gray-600">Please log in to view your bookings.</p>
                </div>
            </div>
        );
    }

    const { token } = await auth.api.getToken({
        headers: await headers()
    });
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings?email=${userEmail}`, {
        headers: { authorization: `Bearer ${token}` }
    });
    const bookings = await res.json();

    if (!bookings || bookings.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 text-center max-w-md w-full">
                    <div className="bg-amber-100 rounded-full p-4 w-fit mx-auto mb-4">
                        <Calendar className="text-amber-600" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bookings Yet</h2>
                    <p className="text-gray-600 mb-2">You haven t booked any tutor sessions.</p>
                    <p className="text-sm text-gray-500">Start your learning journey by booking a session today!</p>
                </div>
            </div>
        );
    }

    const avatarColors = [
        'bg-blue-100 text-blue-600',
        'bg-purple-100 text-purple-600',
        'bg-emerald-100 text-emerald-600',
        'bg-amber-100 text-amber-600',
        'bg-rose-100 text-rose-600',
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8 flex items-start gap-3">
                    <BookOpen className="text-blue-600 mt-1" size={26} />
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            My Booked Sessions
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">Manage and track all your tutor bookings</p>
                    </div>
                </div>

                {/* ── DESKTOP TABLE (hidden on mobile) ── */}
                <div className="hidden sm:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    <span className="flex items-center gap-1.5"><User size={13} /> Tutor</span>
                                </th>
                                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Your Name</th>
                                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    <span className="flex items-center gap-1.5"><Mail size={13} /> Email</span>
                                </th>
                                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    <span className="flex items-center gap-1.5"><Phone size={13} /> Phone</span>
                                </th>
                                <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {bookings.map((book, index) => (
                                <tr key={book._id} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${avatarColors[index % avatarColors.length]}`}>
                                                {book.tutorName?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-semibold text-gray-900 whitespace-nowrap">{book.tutorName}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-gray-700">{book.name}</td>
                                    <td className="px-5 py-4 text-gray-500 max-w-[200px] truncate">{book.email}</td>
                                    <td className="px-5 py-4 text-gray-700 whitespace-nowrap">{book.phone}</td>
                                    <td className="px-5 py-4 text-center">
                                        <AlertDelete book={book} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-right">
                        <span className="text-xs text-gray-400">{bookings.length} session{bookings.length !== 1 ? 's' : ''} found</span>
                    </div>
                </div>

                {/* ── MOBILE CARDS (hidden on sm+) ── */}
                <div className="sm:hidden space-y-3">
                    {bookings.map((book, index) => (
                        <div key={book._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            {/* Card top accent */}
                            <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />

                            <div className="p-5">
                                {/* Tutor name + avatar */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${avatarColors[index % avatarColors.length]}`}>
                                        {book.tutorName?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{book.tutorName}</p>
                                        <p className="text-xs text-gray-400">Tutor Session</p>
                                    </div>
                                </div>

                                {/* Info rows */}
                                <div className="space-y-2.5 mb-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Your Name</span>
                                        <span className="text-sm font-medium text-gray-800">{book.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1"><Mail size={11} /> Email</span>
                                        <span className="text-sm text-gray-600 max-w-[60%] truncate text-right">{book.email}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1"><Phone size={11} /> Phone</span>
                                        <span className="text-sm font-medium text-gray-800">{book.phone}</span>
                                    </div>
                                </div>

                                {/* Delete button — full width on mobile */}
                                <AlertDelete book={book} fullWidth />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MyBookingPage;