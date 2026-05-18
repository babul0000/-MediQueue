
import { Table } from '@heroui/react';
import React from 'react';

const MyBookingPage = async () => {
    
    const res = await fetch('http://localhost:5000/my-bookings');
    const bookings = await res.json();
    console.log(bookings);

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
                        <Table.Cell> </Table.Cell>
                        <Table.Cell>
                            <button variant='primary'>
                                ✕
                            </button>
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