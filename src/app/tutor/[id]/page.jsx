import { BookingModal } from '@/components/BookModal';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DetailsPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:5000/tutor/${id}`)
    const data = await res.json()
    const {
        _id,
        tutorName,
        photoUrl,
        subject,
        institution,
        experience,
        location,
        mode,
        availableDaysAndTime,
        hourlyFee,
        totalSlot
,
        sessionStartDate
    } = data || {};
    console.log(data);
    return (
        <div className="max-w-[1000px] mx-auto bg-white border border-[#e5e7eb] rounded-[24px] p-8 font-sans flex items-center gap-10 shadow-sm">
            

            <div className="w-[450px] h-[300px] rounded-[18px] overflow-hidden relative shrink-0">
                <Image
                    src={photoUrl}
                    alt={tutorName}
                    width={200}
                    height={200}
                    className="object-cover"
                />
            </div>


            <div className="flex-1 flex flex-col justify-center">
                

                <div className="mb-4">
                    <h2 className="text-[32px] font-bold text-black font-serif leading-tight">
                        {tutorName}
                    </h2>
                    <p className="text-[17px] text-[#707b8c] font-medium mt-1">
                        {subject}
                    </p>
                </div>


                <div className="space-y-1.5 text-[16px] text-black font-normal mb-6">
                    <p><span className="font-bold">Institution:</span> {institution}</p>
                    <p><span className="font-bold">Experience:</span> {experience}</p>
                    <p><span className="font-bold">Location:</span> {location}</p>
                    <p><span className="font-bold">Mode:</span> {mode}</p>
                    <p><span className="font-bold">Available & Time Slot:</span> {availableDaysAndTime}</p>
                    <p><span className="font-bold">Hourly Fee:</span> ৳{hourlyFee}/hr</p>
                    <p><span className="font-bold">Remaining Slots:</span> {totalSlot
}</p>
                    <p><span className="font-bold">Session Start Date:</span> {sessionStartDate}</p>
                </div>


                <div>
                    
<BookingModal data={data}/>
                        
                </div>

            </div>
            

        </div>
    );
};

export default DetailsPage;