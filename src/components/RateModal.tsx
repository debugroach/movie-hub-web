import { useState } from 'react';
import { Button, message, Modal, Rate } from 'antd';
import { Movie } from '../hooks/useMovies';

interface Props {
    user: string | null;
    movie: Movie,
}
const RateModal = ({ user, movie }: Props) => {
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };


    const onClick = (value: number) => {
        console.log(value);
        if (user) {
            console.log(movie.id, value);
            messageApi.open({
                type: 'success',
                content: 'You have rated this movie successfully!',
            });
        } else {
            messageApi.open({
                type: 'error',
                content: 'you need to login to rate this movie',
            });
        }
        setOpen(false);
    }

    return (
        <>
            {contextHolder}
            <Button type="primary" onClick={showModal}>
                Rate for this movie
            </Button>
            <Modal
                open={open}
                onCancel={handleCancel}
                footer={null}
            >
                <Rate allowHalf onChange={(value) => onClick(value)} />
            </Modal>
        </>
    );
};

export default RateModal;