import AlertDelete from '@/components/AlertDelete';
import { auth } from "@/lib/auth"; 
import { Table } from '@heroui/react';
import { headers } from "next/headers";
import React from 'react';

export const metadata = {
  title: "My Bookings - MediQueue",
  description: "View and manage your booked tutor sessions.",
};

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
                <h2 className="text-xl font-semibold text-gray-700">Please log in to view your bookings.</h2>
            </div>
        );
    }
 const { token } = await auth.api.getToken({
        headers: await headers()
    });
    const res = await fetch(`http://localhost:5000/my-bookings?email=${userEmail}`, {
        cache: 'no-store' ,
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const bookings = await res.json();

    if (!bookings || bookings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Bookings Found</h2>
                <p className="text-gray-500">You haven t booked any tutor sessions yet!</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Booked Sessions</h1>
            
            <Table aria-label="Bookings Table">
                <Table.ScrollContainer>
                    <Table.Content className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader>Name</Table.Column>
                            <Table.Column>Phone</Table.Column>
                            <Table.Column>Tutor Name</Table.Column>
                            <Table.Column>Email</Table.Column>

                            <Table.Column>Action / Status</Table.Column>
                        </Table.Header>
                        
                        <Table.Body>
                            {bookings.map((book) => (
                                <Table.Row key={book._id}>
                                    <Table.Cell className="font-medium text-gray-900">{book.name}</Table.Cell>
                                    <Table.Cell>{book.phone}</Table.Cell>
                                    <Table.Cell>{book.tutorName}</Table.Cell>
                                    <Table.Cell className="text-gray-500">{book.email}</Table.Cell>


                                    <Table.Cell>
                                        <AlertDelete book={book} />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default MyBookingPage;