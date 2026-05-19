"use client";
import { AlertDialog, Button } from "@heroui/react";
import React, { useState } from 'react';
import { MdCancel } from "react-icons/md";

const AlertDelete = ({ book }) => {
    const [currentStatus, setCurrentStatus] = useState(book.status);

    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:5000/booking/${book._id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ status: 'cancelled' })
            });
            
            const data = await res.ok;
            
            if (res.ok) {

                setCurrentStatus('cancelled');
            }
        } catch (error) {
            console.error("Error updating booking status:", error);
        }
    };

    const isCancelled = currentStatus === 'cancelled';

    return (
        <div className="flex items-center gap-4">

            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize border ${
                isCancelled 
                    ? 'bg-red-50 text-red-600 border-red-200' 
                    : 'bg-green-50 text-green-600 border-green-200'
            }`}>
                {isCancelled ? 'cancelled' : 'Confirmed'}
            </span>


            <AlertDialog>
                <AlertDialog.Trigger>
                    <Button 
                        variant="danger" 
                        isDisabled={isCancelled}
                        className={isCancelled ? "opacity-50 cursor-not-allowed" : ""}
                    >
                        <MdCancel className="text-xl" />
                    </Button>
                </AlertDialog.Trigger>

                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                            <AlertDialog.CloseTrigger />
                            
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Cancel Tutor Session?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            
                            <AlertDialog.Body>
                                <p>
                                    Are you sure you want to cancel the session with <strong>{book.tutorName}</strong>? 
                                    This action will change your booking status to cancelled.
                                </p>
                            </AlertDialog.Body>
                            
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    No, Keep It
                                </Button>
                                <Button onClick={handleDelete} slot="close" variant="danger">
                                    Yes, Cancel Session
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default AlertDelete;