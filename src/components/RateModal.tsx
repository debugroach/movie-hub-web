import React, { useState } from 'react';
import { Button, Modal, Rate } from 'antd';
import { Movie } from '../hooks/useMovies';
import RateForm from './RateForm';

interface Props {
    movie: Movie,
}
const RateModal = ({ movie }: Props) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Rate
            </Button>
            <Modal
                title="Login"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <RateForm />
            </Modal>
        </>
    );
};

export default RateModal;