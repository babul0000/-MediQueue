import TutorCard from '@/components/TutorCard';
import React from 'react';

const TutorPage = async() => {
    const res = await fetch('http://localhost:5000/tutor')
    const tutors = await res.json()
    console.log(tutors);
    
    return (
        <div>
            All Tutor

            <div className='grid grid-cols-3 gap-6'>
                {
                    tutors.map(tutor => <TutorCard key={tutor._id} tutor={tutor}/>)
                }
            </div>
        </div>
    );
};

export default TutorPage;
