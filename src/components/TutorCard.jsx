import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TutorCard = ({ tutor }) => {
    const {
        _id,
        tutorName,
        photoUrl,
        subject,
        availableDaysAndTime,
        sessionStartDate,
        hourlyFee,
    } = tutor || {};

    const initials = tutorName
        ? tutorName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
        : 'TU';

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
                .tc-wrap { font-family: 'DM Sans', sans-serif; }
                .tc-wrap h3 { font-family: 'Playfair Display', serif; }
                .tc-card {
                    transition: box-shadow 0.25s ease, transform 0.25s ease;
                }
                .tc-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 52px rgba(83,74,183,0.14) !important;
                }
                .tc-img-inner {
                    transition: transform 0.4s ease;
                }
                .tc-card:hover .tc-img-inner {
                    transform: scale(1.06);
                }
                .tc-btn {
                    transition: background 0.2s ease, transform 0.15s ease;
                }
                .tc-btn:hover {
                    background: #3C3489 !important;
                    transform: translateY(-1px);
                }
                .tc-btn:active { transform: scale(0.98); }
            `}</style>

            <div className="tc-wrap">
                <div
                    className="tc-card relative rounded-[24px] overflow-hidden flex flex-col"
                    style={{
                        background: '#fff',
                        border: '0.5px solid #e5e7eb',
                        boxShadow: '0 4px 24px rgba(83,74,183,0.07)',
                    }}
                >
                    {/* Purple tint */}
                    <div
                        className="absolute inset-0 pointer-events-none z-0"
                        style={{
                            background:
                                'linear-gradient(135deg, rgba(83,74,183,0.04) 0%, transparent 55%)',
                        }}
                    />

                    {/* ── Image ── */}
                    <div className="relative w-full h-[200px] overflow-hidden shrink-0">
                        <div className="tc-img-inner absolute inset-0">
                            {photoUrl ? (
                                <Image
                                    src={photoUrl}
                                    alt={tutorName}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 320px"
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
                                        className="text-[44px] font-bold text-white/90"
                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                    >
                                        {initials}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Bottom fade */}
                        <div
                            className="absolute inset-0 z-10"
                            style={{
                                background:
                                    'linear-gradient(to bottom, transparent 45%, rgba(255,255,255,0.97))',
                            }}
                        />

                        {/* Subject badge — top left */}
                        <div
                            className="absolute top-3 left-3 z-20 text-[11px] font-medium px-3 py-[4px] rounded-full tracking-[0.04em]"
                            style={{
                                background: 'rgba(83,74,183,0.13)',
                                color: '#534AB7',
                                border: '0.5px solid rgba(83,74,183,0.25)',
                            }}
                        >
                            {subject}
                        </div>

                        {/* Fee badge — top right */}
                        <div
                            className="absolute top-3 right-3 z-20 text-[12px] font-semibold px-3 py-[4px] rounded-full"
                            style={{
                                background: 'rgba(255,255,255,0.93)',
                                color: '#534AB7',
                                border: '0.5px solid rgba(83,74,183,0.18)',
                                fontFamily: "'Playfair Display', serif",
                            }}
                        >
                            ৳{hourlyFee}/hr
                        </div>
                    </div>

                    {/* ── Content ── */}
                    <div className="relative z-10 flex flex-col flex-1 px-5 pt-3 pb-5">

                        {/* Name + role */}
                        <h3 className="text-[20px] font-bold leading-tight text-[#111] mb-[2px]">
                            {tutorName}
                        </h3>
                        <p className="text-[11px] uppercase tracking-[0.08em] text-[#b0b8c4] mb-4">
                            Subject Tutor
                        </p>

                        {/* Divider */}
                        <div
                            className="mb-4"
                            style={{ height: '0.5px', background: '#f0f0f0' }}
                        />

                        {/* Info rows */}
                        <div className="flex flex-col gap-[10px] mb-5">
                            <InfoRow icon="📅" label="Schedule" value={availableDaysAndTime} />
                            <InfoRow icon="🗓" label="Starts" value={sessionStartDate} />
                        </div>

                        {/* CTA */}
                        <Link href={`/tutor/${_id}`} className="mt-auto block">
                            <button
                                className="tc-btn w-full text-white text-[14px] font-medium py-[11px] rounded-[12px]"
                                style={{ background: '#534AB7' }}
                            >
                                Book Session →
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

function InfoRow({ icon, label, value }) {
    return (
        <div className="flex items-start gap-[10px]">
            <span className="text-[13px] mt-[1px] shrink-0">{icon}</span>
            <div className="flex flex-col gap-[1px] min-w-0">
                <span className="text-[10px] font-medium uppercase tracking-[0.07em] text-[#b0b8c4]">
                    {label}
                </span>
                <span className="text-[13px] text-[#111] truncate">{value}</span>
            </div>
        </div>
    );
}

export default TutorCard;