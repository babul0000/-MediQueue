

import AlertDelete from '@/components/AlertDelete';
import { Table } from '@heroui/react';
import React from 'react';

const MyBookingPage = async () => {
    const res = await fetch('http://localhost:5000/my-bookings');
    const bookings = await res.json();
    console.log(bookings);

    if (!bookings || bookings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Bookings Found</h2>
                <p className="text-gray-500">You havent booked any tutor sessions yet!</p>
            </div>
        );
    }

    return (
        <div>
            <div>
                <Table aria-label="Bookings Table">
    <Table.ScrollContainer>
        <Table.Content className="min-w-[600px]">
    
            <Table.Header>
                <Table.Column isRowHeader>Name</Table.Column>
                <Table.Column>Phone</Table.Column>
                <Table.Column>Tutor Name</Table.Column>
                <Table.Column>Email</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column>Cancel</Table.Column>
            </Table.Header>
            
            <Table.Body>
                {bookings.map((book) => (
        
                    <Table.Row key={book._id}>
                        <Table.Cell>{book.name}</Table.Cell>
                        <Table.Cell>{book.phone}</Table.Cell>
                        <Table.Cell>{book.tutorName}</Table.Cell>
                        <Table.Cell>{book.email}</Table.Cell>

                        <Table.Cell>
    <span className={` bg-red-200 text-red-500${
        book.status === 'cancelled' 
            ? 'bg-red-500 text-red-500 border-red-200 p-5' 
            : 'bg-green-50 text-green-500 border-green-200'
    }`}>
        {book.status === 'cancelled' ? 'cancelled' : 'Confirmed'}
    </span>
</Table.Cell>

                        <Table.Cell>
                            <AlertDelete book={book}/>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Content>
    </Table.ScrollContainer>
</Table>
            </div>


        </div>
    );
};

export default MyBookingPage;