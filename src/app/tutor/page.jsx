"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TutorCard from '@/components/TutorCard';
import TutorFilter from '@/components/TutorFilter';

const TutorPage = () => {
    const [tutors, setTutors] = useState([]);
    const [filters, setFilters] = useState({ search: '', startDate: '', endDate: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTutors = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutor`, { cache: "no-store" });
                const data = await res.json();
                setTutors(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadTutors();
    }, []);

    const filteredTutors = useMemo(() => {
        const searchValue = filters.search.trim().toLowerCase();
        const startMs = filters.startDate ? Date.parse(filters.startDate) : null;
        const endMs = filters.endDate ? Date.parse(filters.endDate) : null;

        return tutors.filter((tutor) => {
            const matchesName = searchValue ? tutor.tutorName?.toLowerCase().includes(searchValue) : true;
            if (!matchesName) return false;
            const tutorDateMs = Date.parse(tutor.sessionStartDate || '');
            if (Number.isNaN(tutorDateMs)) return true;
            if (startMs && tutorDateMs < startMs) return false;
            if (endMs && tutorDateMs > endMs + 24 * 60 * 60 * 1000 - 1) return false;
            return true;
        });
    }, [tutors, filters]);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-10">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-slate-900 mb-8"
            >
                All Tutors
            </motion.h1>

            <TutorFilter onChange={setFilters} />

            {loading ? (
                <div className="text-slate-500 py-20 text-center">Loading tutors...</div>
            ) : (
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="wait">
                        {filteredTutors.map((tutor) => (
                            <motion.div
                                key={tutor._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <TutorCard tutor={tutor} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default TutorPage;