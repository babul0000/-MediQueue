"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";


    

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    return (
        <div className="w-full max-w-7xl mx-auto px-6 my-10">

            <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 text-gray-400 font-medium text-sm">
                            <th className="pb-4 pt-2 px-4">Name</th>
                            <th className="pb-4 pt-2 px-4">Phone</th>
                            <th className="pb-4 pt-2 px-4">Tutor Name</th>
                            <th className="pb-4 pt-2 px-4">Email</th>
                            <th className="pb-4 pt-2 px-4">Status</th>
                            <th className="pb-4 pt-2 px-4 text-center">Cancel</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-gray-700 text-sm">
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-400">
                                    No booked sessions found.
                                </td>
                            </tr>
                        ) : (
                            bookings.map((session) => (
                                <tr key={session._id} className="hover:bg-gray-50/40 transition-colors">
  
                                    <td className="py-4 px-4 font-medium text-gray-900">{session.name}</td>

                                    <td className="py-4 px-4 text-gray-600">{session.phone}</td>

                                    <td className="py-4 px-4 text-gray-800 font-medium">{session.tutorName}</td>

                                    <td className="py-4 px-4 text-gray-600">{session.email}</td>

                                    <td className="py-4 px-4">
                                        <span
                                            className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${
                                                session.status === "cancelled"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-green-100 text-green-600"
                                            }`}
                                        >
                                            {session.status || "Confirmed"}
                                        </span>
                                    </td>

                                    <td className="py-4 px-4 text-center">
                                        <Button
                                            isIconOnly
                                            variant="bordered"
                                            color="danger"
                                            size="sm"
                                            className="border border-red-200 hover:bg-red-50 min-w-8 h-8 rounded-lg"
                                            onClick={() => handleCancel(session._id)}
                                        >
                                            <span className="text-sm font-light">✕</span>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBooking;