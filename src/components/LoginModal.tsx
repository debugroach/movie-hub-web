import React, { useState } from 'react';
import { Button, Modal, Rate } from 'antd';
import { Movie } from '../hooks/useMovies';
import RateForm from './RateForm';
import LoginForm from './LoginForm';


const LoginModal = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
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
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <LoginForm />
            </Modal>
        </>
    );
};

export default LoginModal;