import { BookingModal } from '@/components/BookModal';
import TutorCard from '@/components/TutorCard';
import React from 'react';

const TutorPage = async() => {
    const res = await fetch('http://localhost:5000/tutor')
    const tutors = await res.json()
    console.log(tutors);
    
    return (
        <div className='w-10/12 mx-auto'>
            All Tutor

            <div className='grid grid-cols-3 gap-6 p-10'>
                {
                    tutors.map(tutor => <TutorCard key={tutor._id} tutor={tutor}/>)
                }
            </div>

        </div>
    );
};

export default TutorPage;
