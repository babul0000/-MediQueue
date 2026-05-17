import MyBooking from '@/components/MyBooking';
import React from 'react';

const MyBookingPage = async() => {
    const res = await fetch('http://localhost:5000/my-bookings');
const bookings = await res.json();
console.log(bookings);

    return (
        <div>
            {
                bookings.map((booking) => <div key={booking._id}>
                    <MyBooking/>
                </div>)
            }
        </div>
    );
};

export default MyBookingPage;