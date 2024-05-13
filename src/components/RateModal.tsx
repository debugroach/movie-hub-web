import { useState } from 'react';
import { Button, message, Modal, Rate } from 'antd';
import { Movie } from '../hooks/useMovies';
import axios from 'axios';
import { url } from '../config';

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


    const onClick = async (value: number) => {
        console.log(value);
        if (user) {
            console.log(movie.id, value * 2);
            const res = await axios.post(url + "/rate", {
                username: user,
                movieId: movie.id,
                rating: value * 2,
                title: movie.title,
                posterPath: movie.poster_path,
                backdropPath: movie.backdrop_path,
                voteAverage: movie.vote_average,
            });
            console.log(res.data);
            messageApi.open({
                type: res.data.hasError ? 'error' : 'success',
                content: res.data.message,
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