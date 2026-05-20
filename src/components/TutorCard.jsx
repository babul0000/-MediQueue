import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TutorCard = ({ tutor }) => {
    const {
        _id,
        tutorName,
        photoUrl,
    } = tutor || {};

    const subject = tutor.subjectCategory || tutor.subject || "General";
    const availableDaysAndTime = tutor.availableDaysAndTime || tutor.availableDaysTime || "Not scheduled";
    const sessionStartDate = tutor.sessionStartDate || tutor.startDate || "N/A";
    const hourlyFee = tutor.hourlyFee || 0;

    const initials = tutorName
        ? tutorName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
        : 'TU';

    return (
        <>
        

            <div className="tc-wrap">
                <div className="tc-card relative rounded-[24px] overflow-hidden flex flex-col bg-white border border-gray-200 shadow-[0_4px_24px_rgba(83,74,183,0.07)]">
                    
                    <div className="relative w-full h-[200px] overflow-hidden shrink-0">
                        <div className="tc-img-inner absolute inset-0">
                            {photoUrl ? (
                                <Image src={photoUrl} alt={tutorName} fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#CECBF6] to-[#7F77DD]">
                                    <span className="text-[44px] font-bold text-white/90">{initials}</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="absolute top-3 left-3 z-20 text-[11px] font-medium px-3 py-[4px] rounded-full tracking-[0.04em] bg-[rgba(83,74,183,0.13)] text-[#534AB7] border border-[rgba(83,74,183,0.25)]">
                            {subject}
                        </div>

                        <div className="absolute top-3 right-3 z-20 text-[12px] font-semibold px-3 py-[4px] rounded-full bg-white text-[#534AB7] border border-[rgba(83,74,183,0.18)]">
                            ৳{hourlyFee}/hr
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col flex-1 px-5 pt-3 pb-5">
                        <h3 className="text-[20px] font-bold leading-tight text-[#111] mb-[2px]">{tutorName}</h3>
                        <p className="text-[11px] uppercase tracking-[0.08em] text-[#b0b8c4] mb-4">Subject Tutor</p>
                        <div className="mb-4 h-[0.5px] bg-[#f0f0f0]" />

                        <div className="flex flex-col gap-[10px] mb-5">
                            <InfoRow icon="📅" label="Schedule" value={availableDaysAndTime} />
                            <InfoRow icon="🗓" label="Starts" value={sessionStartDate} />
                        </div>

                        <Link href={`/tutor/${_id}`} className="mt-auto block">
                            <button className="tc-btn w-full text-white text-[14px] font-medium py-[11px] rounded-[12px] bg-[#534AB7]">
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
                <span className="text-[10px] font-medium uppercase tracking-[0.07em] text-[#b0b8c4]">{label}</span>
                <span className="text-[13px] text-[#111] truncate" title={value}>{value}</span>
            </div>
        </div>
    );
}

export default TutorCard;