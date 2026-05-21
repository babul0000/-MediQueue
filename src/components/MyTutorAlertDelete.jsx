"use client";
import { AlertDialog, Button } from "@heroui/react";
import React from 'react';
import { MdDeleteOutline } from "react-icons/md";
import toast from 'react-hot-toast';

const MyTutorAlertDelete = ({ book, onDeleteSuccess }) => {
    
    const handleDelete = async () => {
        // const { token } = await authClient.token;
        const res = await fetch(`http://localhost:5000/tutor/${book._id}`, {
            method: 'DELETE',
            // headers: {
            //     'authorization': `Bearer ${token}`
            // }
        });
        
        if (res.ok) {
            toast.success("Tutor deleted successfully!");
            if (onDeleteSuccess) onDeleteSuccess(book._id);
        } else {
            toast.error("Failed to delete.");
        }
    };

    return (
        <AlertDialog>
            <AlertDialog.Trigger>
                <Button variant="danger" className="p-2">
                    <MdDeleteOutline className="text-xl" />
                </Button>
            </AlertDialog.Trigger>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete Tutor?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        
                        <AlertDialog.Body>
                            <p>Are you sure you want to remove <strong>{book.tutorName}</strong>?</p>
                        </AlertDialog.Body>
                        
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">Cancel</Button>
                            <Button onClick={handleDelete} slot="close" variant="danger">Yes, Delete</Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default MyTutorAlertDelete;