import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import LoginForm from './LoginForm';

interface Props {
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginModal = ({ setUser }: Props) => {
    const [open, setOpen] = useState(false);


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
                Login
            </Button>
            <Modal
                title="Login"
                open={open}
                onCancel={handleCancel}
                footer={null}
            >
                <LoginForm setOpen={setOpen} setUser={setUser} />
            </Modal>
        </>
    );
};

export default LoginModal;