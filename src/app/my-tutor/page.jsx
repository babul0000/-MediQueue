"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from "@/lib/auth-client";
import toast from 'react-hot-toast';

const MyTutors = () => {
    const { data: session } = useSession();
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user?.email) {
            fetch(`http://localhost:5000/my-tutors/${session.user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setTutors(data);
                    setLoading(false);
                })
                .catch(() => {
                    toast.error("Failed to load your tutors");
                    setLoading(false);
                });
        }
    }, [session]);

    if (loading) return <div className="text-center mt-10">Loading your tutors...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8 text-slate-900">My Tutors</h1>

            {tutors.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500 font-medium">You haven t added any tutors yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 font-semibold text-gray-700">Tutor Name</th>
                                <th className="p-4 font-semibold text-gray-700">Subject</th>
                                <th className="p-4 font-semibold text-gray-700">Fee/hr</th>
                                <th className="p-4 font-semibold text-gray-700">Mode</th>
                                <th className="p-4 font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tutors.map((tutor) => (
                                <tr key={tutor._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{tutor.tutorName}</td>
                                    <td className="p-4 text-gray-600">{tutor.subject || tutor.subjectCategory}</td>
                                    <td className="p-4 text-gray-600">৳{tutor.hourlyFee}</td>
                                    <td className="p-4 text-gray-600">
                                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium">
                                            {tutor.teachingMode}
                                        </span>
                                    </td>
                                    <td className="p-4 flex gap-2">
                                        <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-xs font-medium">
                                            Edit
                                        </button>
                                        <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs font-medium">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyTutors;