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
        hourlyFee
    } = tutor || {};

    return (
        <div className="bg-white rounded-2xl p-10  shadow-sm border border-gray-100 items-center">


            <div className=" h-[200px] w-full">
                <Image
                    src={photoUrl}
                    alt={tutorName}
                    width={200}
                    height={200}
                    sizes="100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>


            <div className="mb-[14px]">
                <h3 className="text-[25px] font-bold text-black font-serif leading-tight">
                    {tutorName}
                </h3>
                <p className="text-[17px] text-[#707b8c] font-medium mt-[2px]">
                    {subject}
                </p>
            </div>


            <div className="space-y-[6px] text-[15.5px] text-black font-normal mb-[24px]">
                <p>
                    {availableDaysAndTime}
                </p>
                <p>
                    {sessionStartDate}
                </p>
                <p>
                    Fee: ৳{hourlyFee}/hr
                </p>
            </div>


            <Link href={`/tutor/${_id}`}>
                <button className="w-full bg-[#009688] hover:bg-[#00897b]  text-[16px] font-medium py-[11px] rounded-[12px] transition-colors duration-200">
                    Book Session
                </button>
            </Link>

        </div>
    );
};

export default TutorCard;