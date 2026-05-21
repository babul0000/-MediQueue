"use client";
import React, { useRef, useState } from "react";
import {
    Modal, ModalBackdrop, ModalBody, ModalCloseTrigger, ModalContainer,
    ModalDialog, ModalFooter, ModalHeader, ModalTrigger, Button, Input
} from "@heroui/react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

const EditTutorModal = ({ tutor, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({ ...tutor });
    const closeButtonRef = useRef(null);

    const handleUpdate = async () => {
        // const { token } = await authClient.token;
        const res = await fetch(`http://localhost:5000/tutor/${tutor._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                // "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            toast.success("Updated successfully!");
            onUpdateSuccess(formData);
            closeButtonRef.current?.click();
        } else {
            toast.error("Failed to update.");
        }
    };

    return (
        <Modal>
            <ModalTrigger>
                <Button size="sm" color="primary"><FaEdit/></Button>
            </ModalTrigger>
            <ModalBackdrop>
                <ModalContainer>
                    <ModalDialog className="bg-white rounded-3xl p-6">
                        <ModalHeader>Edit Tutor</ModalHeader>
                        <ModalBody className="grid gap-4">
                            <Input label="Tutor Name" value={formData.tutorName}
                                onChange={(e) => setFormData({ ...formData, tutorName: e.target.value })} />
                            <Input label="Subject" value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                            <Input label="Hourly Fee" type="number" value={formData.hourlyFee}
                                onChange={(e) => setFormData({ ...formData, hourlyFee: Number(e.target.value) })} />
                        </ModalBody>
                        <ModalFooter>
                            <Button slot="close" color="danger" variant="flat">Cancel</Button>
                            <Button color="primary" onPress={handleUpdate}>Save Changes</Button>
                            <Button slot="close" ref={closeButtonRef} className="hidden" />
                        </ModalFooter>
                    </ModalDialog>
                </ModalContainer>
            </ModalBackdrop>
        </Modal>
    );
};

export default EditTutorModal;