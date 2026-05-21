"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

import {
    FaEdit,
    FaTrash,
    FaBookOpen,
} from "react-icons/fa";

import {
    Chip,
    Spinner,
} from "@heroui/react";

import MyTutorAlertDelete from "@/components/MyTutorAlertDelete";
import EditTutorModal from "@/components/EditTutorModal";

const MyTutors = () => {
    const { data: session } = useSession();

    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    // Load Tutors
    useEffect(() => {
        const loadTutors = async () => {
            if (!session?.user?.email || hasLoaded) return;

            setLoading(true);

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors/${session.user.email}`
                );

                const data = await res.json();

                setTutors(data);
                setHasLoaded(true);
            } catch (error) {
                console.error("Failed to load tutors:", error);
            } finally {
                setLoading(false);
            }
        };

        loadTutors();
    }, [session?.user?.email, hasLoaded]);

    // Loading State
    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">

                <div
                    className="
            w-10 h-10
            rounded-xl
            bg-primary/10
            text-primary
            flex
            items-center
            justify-center
          "
                >
                    <FaBookOpen size={18} />
                </div>

                <div>
                    <h1 className="text-2xl font-bold">
                        My Tutors
                    </h1>

                    <p className="text-sm text-default-500">
                        Manage your tutors
                    </p>
                </div>
            </div>

            {/* Empty State */}
            {tutors.length === 0 ? (
                <div
                    className="
            border-2 border-dashed
            border-default-200
            rounded-2xl
            py-16
            text-center
            bg-default-50
          "
                >
                    <div className="text-5xl mb-3">
                        📚
                    </div>

                    <h2 className="text-xl font-semibold mb-2">
                        No Tutors Added
                    </h2>

                    <p className="text-sm text-default-500">
                        Add tutors to manage them here.
                    </p>
                </div>
            ) : (

                // Table
                <div
                    className="
            overflow-x-auto
            rounded-2xl
            border
            border-default-200
            shadow-sm
            bg-background
            "
                >

                    <table className="w-full text-sm">

                        {/* Table Head */}
                        <thead className="bg-default-100">

                            <tr>
                                <th className="text-left p-3 font-semibold">
                                    Tutor
                                </th>

                                <th className="text-left p-3 font-semibold">
                                    Subject
                                </th>

                                <th className="text-left p-3 font-semibold">
                                    Fee
                                </th>

                                <th className="text-left p-3 font-semibold">
                                    <div className="flex items-center gap-6">
                                        <span>Edit</span>
                                        <span>Delete</span>
                                    </div>
                                </th>
                            </tr>

                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-default-100">

                            {tutors.map((tutor) => (

                                <tr
                                    key={tutor._id}
                                    className="
                    hover:bg-default-50
                    transition-all
                    duration-200
                    "
                                >

                                    {/* Tutor */}
                                    <td className="p-3">

                                        <div className="flex items-center gap-3">

                                            {/* Avatar */}
                                            <div
                                                className="
                            w-9 h-9
                            rounded-full
                            bg-primary/10
                            text-primary
                            font-semibold
                            text-sm
                            flex
                            items-center
                            justify-center
                        "
                                            >
                                                {tutor?.tutorName?.charAt(0)}
                                            </div>

                                            {/* Name */}
                                            <h2 className="font-medium text-sm">
                                                {tutor.tutorName}
                                            </h2>

                                        </div>

                                    </td>

                                    {/* Subject */}
                                    <td className="p-3">

                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            color="primary"
                                            className="text-xs"
                                        >
                                            {tutor.subject || tutor.subjectCategory}
                                        </Chip>

                                    </td>

                                    {/* Fee */}
                                    <td className="p-3">

                                        <span
                                            className="
                        font-semibold
                        text-success
                        text-sm
                        "
                                        >
                                            ৳{tutor.hourlyFee}/hr
                                        </span>

                                    </td>

                                    {/* Actions */}
                                    <td className="p-3">

                                        <div className="flex items-center gap-2">
                                            {/* Edit Button */}
                                            <div className="p-2 rounded-full hover:bg-blue-50 text-blue-600 transition-all cursor-pointer">
                                                <EditTutorModal
                                                    tutor={tutor}
                                                    icon={<FaEdit size={16} />}
                                                    onUpdateSuccess={(updatedData) => {
                                                        setTutors((prev) =>
                                                            prev.map((t) => (t._id === tutor._id ? { ...t, ...updatedData } : t))
                                                        );
                                                    }}
                                                />
                                            </div>

                                            {/* Delete Button */}
                                            <div
                                                className=" rounded-full hover:bg-red-50 text-red-600 transition-all cursor-pointer"
                                            >
                                                <MyTutorAlertDelete
                                                    book={tutor}
                                                    icon={<FaTrash size={16} />}
                                                    onDeleteSuccess={(id) =>
                                                        setTutors((prev) => prev.filter((t) => t._id !== id))
                                                    }
                                                />
                                            </div>
                                        </div>

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