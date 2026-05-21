"use client";

import React, { useState } from 'react';
import { AlertDialog, Button } from "@heroui/react";
import { MdCancel } from "react-icons/md";
// import { authClient } from "@/lib/auth-client";

const AlertDelete = ({ book }) => {
    const [status, setStatus] = useState(book.status);
    const [loading, setLoading] = useState(false);

    const handleCancelSession = async () => {
        setLoading(true);
        try {
            // const { data: session } = await authClient.getSession();
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${book._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${session?.token}`
                },
                body: JSON.stringify({ status: 'cancelled' })
            });

            if (res.ok) {
                setStatus('cancelled');
            }
        } catch (error) {
            console.error("Cancellation failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const isCancelled = status === 'cancelled';

    return (
        <div className="flex items-center gap-3">
            {/* Status Badge */}
            <span className={`px-3 py-1 text-xs font-bold rounded-full border ${isCancelled ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                }`}>
                {isCancelled ? 'Cancelled' : 'Confirmed'}
            </span>

            {/* Cancel Button */}
            <AlertDialog>
                <AlertDialog.Trigger>
                    <Button
                        isIconOnly
                        variant="flat"
                        color="danger"
                        isDisabled={isCancelled}
                        isLoading={loading}
                    >
                        <MdCancel className="text-xl" />
                    </Button>
                </AlertDialog.Trigger>

                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog>
                            <AlertDialog.Header>
                                <AlertDialog.Heading>Cancel Session?</AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                <p>Are you sure you want to cancel the session with <strong>{book.tutorName}</strong>? This action cannot be undone.</p>
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                                <Button slot="close" variant="flat">Keep Session</Button>
                                <Button color="danger" onClick={handleCancelSession}>Yes, Cancel</Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default AlertDelete;