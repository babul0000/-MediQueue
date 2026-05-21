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
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutor/${id}`,{
        headers: {
            authorization: `Bearer ${token}`
        },
    });
    const data = await res.json();

    const {
        tutorName,
        photoUrl,
        subject,
        institution,
        experience,
        location,
        teachingMode,
        availableDaysAndTime,
        hourlyFee,
        totalSlot,
        sessionStartDate,
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
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
                .tutor-detail-root { font-family: 'DM Sans', sans-serif; }
                .tutor-detail-root h2 { font-family: 'Playfair Display', serif; }
                .book-btn-wrap button, .book-btn-wrap a {
                    transition: background 0.2s, transform 0.15s;
                }
                .book-btn-wrap button:hover, .book-btn-wrap a:hover {
                    background: #3C3489 !important;
                    transform: translateY(-1px);
                }
            `}</style>

            <div className="tutor-detail-root min-h-screen bg-[#f6f5ff] flex items-center justify-center py-12 px-4">
                <div
                    className="relative w-full max-w-[1020px] rounded-[32px] overflow-hidden flex"
                    style={{
                        background: '#fff',
                        border: '0.5px solid #e5e7eb',
                        boxShadow: '0 8px 48px rgba(83,74,183,0.10)',
                        minHeight: '400px',
                    }}
                >
                    {/* ── Purple gradient tint overlay ── */}
                    <div
                        className="absolute inset-0 pointer-events-none z-0"
                        style={{
                            background:
                                'linear-gradient(135deg, rgba(83,74,183,0.05) 0%, transparent 55%)',
                        }}
                    />

                    {/* ── Left: Image Panel ── */}
                    <div className="relative w-[320px] min-w-[320px] overflow-hidden shrink-0">
                        {photoUrl ? (
                            <Image
                                src={photoUrl}
                                alt={tutorName}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div
                                className="w-full h-full flex items-center justify-center"
                                style={{
                                    background:
                                        'linear-gradient(145deg, #CECBF6, #AFA9EC, #7F77DD)',
                                }}
                            >
                                <span
                                    className="text-[64px] font-bold text-white/90"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    {initials}
                                </span>
                            </div>
                        )}

                        {/* Fade right edge into white */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    'linear-gradient(to right, transparent 50%, #fff)',
                            }}
                        />

                        {/* Subject badge */}
                        <div
                            className="absolute top-5 left-5 text-[12px] font-medium px-4 py-[5px] rounded-full tracking-[0.04em]"
                            style={{
                                background: 'rgba(83,74,183,0.12)',
                                color: '#534AB7',
                                border: '0.5px solid rgba(83,74,183,0.28)',
                            }}
                        >
                            {subject}
                        </div>

                        {/* Mode badge */}
                        <div
                            className="absolute bottom-5 left-5 text-[11px] font-medium px-3 py-[4px] rounded-full"
                            style={{
                                background: '#E1F5EE',
                                color: '#0F6E56',
                                border: '0.5px solid #5DCAA5',
                            }}
                        >
                            🎥 {teachingMode}
                        </div>
                    </div>

                    {/* ── Right: Content Panel ── */}
                    <div className="flex-1 flex flex-col justify-between p-10 pl-8 relative z-10">

                        {/* Top: name + fee */}
                        <div className="flex items-start justify-between gap-4 mb-6">
                            <div>
                                <h2
                                    className="text-[32px] font-bold leading-tight text-[#111] mb-1"
                                >
                                    {tutorName}
                                </h2>
                                <p className="text-[13px] uppercase tracking-[0.07em] text-[#9ca3af]">
                                    Senior Subject Tutor
                                </p>
                            </div>

                            {/* Fee pill — top right */}
                            <div
                                className="shrink-0 flex flex-col items-end"
                            >
                                <span className="text-[11px] uppercase tracking-[0.07em] text-[#9ca3af] mb-1">
                                    Hourly Fee
                                </span>
                                <span
                                    className="text-[26px] font-bold"
                                    style={{
                                        fontFamily: "'Playfair Display', serif",
                                        color: '#534AB7',
                                    }}
                                >
                                    ৳{hourlyFee}
                                    <span className="text-[14px] font-normal text-[#9ca3af]">
                                        /hr
                                    </span>
                                </span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div
                            className="mb-6"
                            style={{ height: '0.5px', background: '#f0f0f0' }}
                        />

                        {/* Info grid */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-[14px] mb-8">
                            {infoItems.map(({ label, value, green }) => (
                                <div key={label} className="flex flex-col gap-[3px]">
                                    <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#9ca3af]">
                                        {label}
                                    </span>
                                    <span
                                        className="text-[13px] leading-snug"
                                        style={{
                                            color: green ? '#1D9E75' : '#111',
                                            fontWeight: green ? 500 : 400,
                                        }}
                                    >
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Bottom row: slots + booking button */}
                        <div className="flex items-center gap-3">
                            {/* Slots badge */}
                            <div
                                className="text-[12px] px-4 py-[6px] rounded-full whitespace-nowrap"
                                style={{
                                    border: '0.5px solid #e5e7eb',
                                    color: '#6b7280',
                                    background: '#f9fafb',
                                }}
                            >
                                🕐{' '}
                                <span className="text-[#1D9E75] font-medium">
                                    {totalSlot}
                                </span>{' '}
                                remaining
                            </div>

                            {/* BookingModal — fills remaining width */}
                            <div
                                className="flex-1 book-btn-wrap"
                                style={{
                                    /* Override BookingModal's button to match design */
                                }}
                            >
                                <BookingModal data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailsPage;