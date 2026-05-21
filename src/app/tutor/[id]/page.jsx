import { BookingModal } from '@/components/BookModal';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const DetailsPage = async ({ params }) => {
    const { id } = await params;
    const { token } = await auth.api.getToken({
        headers: await headers()
    });
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutor/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        },
    });
    const data = await res.json();

    const {
        tutorName, photoUrl, subject, institution, experience,
        location, teachingMode, availableDaysAndTime, hourlyFee,
        totalSlot, sessionStartDate,
    } = data || {};

    const initials = tutorName
        ? tutorName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
        : 'TU';

    const infoItems = [
        { label: 'Institution', value: institution },
        { label: 'Experience', value: experience },
        { label: 'Location', value: location },
        { label: 'Schedule', value: availableDaysAndTime },
        { label: 'Session Start', value: sessionStartDate },
        { label: 'Remaining Slots', value: totalSlot, green: true },
    ];

    return (
        <div className="min-h-screen bg-[#f6f5ff] py-8 px-4 md:py-12">
            <div className="max-w-[1020px] mx-auto bg-white rounded-[24px] md:rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_8px_48px_rgba(83,74,183,0.10)] flex flex-col md:flex-row">
                
                {/* Left: Image Panel */}
                <div className="relative w-full md:w-[320px] h-[250px] md:h-auto shrink-0">
                    {photoUrl ? (
                        <Image src={photoUrl} alt={tutorName} fill className="object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#CECBF6] to-[#7F77DD]">
                            <span className="text-5xl font-bold text-white/90">{initials}</span>
                        </div>
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 text-[11px] font-medium px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
                        {subject}
                    </div>
                    <div className="absolute bottom-4 left-4 text-[11px] font-medium px-3 py-1 rounded-full bg-[#E1F5EE] text-[#0F6E56]">
                        🎥 {teachingMode}
                    </div>
                </div>

                {/* Right: Content Panel */}
                <div className="flex-1 p-6 md:p-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl md:text-[32px] font-bold text-[#111]">{tutorName}</h2>
                            <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">Senior Subject Tutor</p>
                        </div>
                        <div className="text-left sm:text-right">
                            <span className="block text-[10px] uppercase text-gray-400">Hourly Fee</span>
                            <span className="text-2xl font-bold text-[#534AB7]">৳{hourlyFee}<span className="text-sm text-gray-400 font-normal">/hr</span></span>
                        </div>
                    </div>

                    <div className="h-[1px] bg-gray-100 mb-6" />

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                        {infoItems.map(({ label, value, green }) => (
                            <div key={label}>
                                <span className="block text-[9px] uppercase font-bold text-gray-400 tracking-wider">{label}</span>
                                <span className={`text-sm ${green ? 'text-[#1D9E75] font-semibold' : 'text-gray-800'}`}>
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="text-[12px] text-gray-500 border border-gray-100 px-4 py-2 rounded-full bg-gray-50 w-full sm:w-auto text-center">
                            🕐 <span className="text-[#1D9E75] font-bold">{totalSlot}</span> remaining
                        </div>
                        <div className="w-full sm:flex-1">
                            <BookingModal data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;