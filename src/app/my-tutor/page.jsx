"use client";
import React, { useState } from 'react';
import { useSession } from "@/lib/auth-client";
import MyTutorAlertDelete from '@/components/MyTutorAlertDelete';

const MyTutors = () => {
    const { data: session } = useSession();
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    const loadTutors = async () => {
        if (!session?.user?.email || hasLoaded) return;
        
        setLoading(true);
        const res = await fetch(`http://localhost:5000/my-tutors/${session.user.email}`);
        const data = await res.json();
        
        setTutors(data);
        setLoading(false);
        setHasLoaded(true);
    };

    if (session?.user?.email && !hasLoaded && !loading) {
        loadTutors();
    }

    if (loading) return <div className="text-center mt-10">Loading your tutors...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">My Tutors</h1>
            {tutors.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500">You haven't added any tutors yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto border rounded-xl">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4">Name</th><th className="p-4">Subject</th>
                                <th className="p-4">Fee/hr</th><th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {tutors.map((tutor) => (
                                <tr key={tutor._id}>
                                    <td className="p-4">{tutor.tutorName}</td>
                                    <td className="p-4">{tutor.subject || tutor.subjectCategory}</td>
                                    <td className="p-4">৳{tutor.hourlyFee}</td>
                                    <td className="p-4 flex gap-2">
                                        <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs">Edit</button>
                                        <MyTutorAlertDelete 
                                            book={tutor} 
                                            onDeleteSuccess={(id) => setTutors(tutors.filter(t => t._id !== id))} 
                                        />
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