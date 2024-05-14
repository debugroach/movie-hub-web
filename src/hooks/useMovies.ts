import React, { useEffect } from "react";
import apiClient from "../services/api-client";
import axios, { CanceledError } from "axios";
import { url } from "../config";
import { MessageInstance } from "antd/es/message/interface";

export interface Movie {
    id: number,
    title: string,
    poster_path: string,
    backdrop_path: string,
    vote_average: number,
}

interface FetchMoviesResponse {
    count: number
    results: Movie[]
}

interface Props {
    user: string | null;
    genre: string | null;
    messageApi: MessageInstance;
}

const useMovies = ({ user, genre, messageApi }: Props) => {
    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [error, setError] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);


    let apiEndpoint = '/movie/';
    if (genre === 'Popular') apiEndpoint += 'popular';
    else if (genre === 'Top Rated') apiEndpoint += 'top_rated';
    else if (genre === 'Upcoming') apiEndpoint += 'upcoming';
    else if (genre === 'Now Playing') apiEndpoint += 'now_playing';



    console.log(genre);
    useEffect(() => {
        setLoading(true);
        if (genre === 'Recommend') {
            if (!user) {
                messageApi.open({
                    type: 'error',
                    content: 'Please login to get recommendations',
                });
                return
            }

            axios.post(url + '/recommend', { username: user })
                .then(res => {
                    if (res.data.movies.length === 0) {
                        messageApi.open({
                            type: 'error',
                            content: 'Rate for your favorite movies to get recommendations',
                        });
                    }
                    setMovies(res.data.movies);
                    setLoading(false);
                })
                .catch(err => {
                    if (err instanceof CanceledError) return;
                    setError(err.message)
                    setLoading(false);
                });
        } else {
            apiClient.get<FetchMoviesResponse>(apiEndpoint)
                .then(res => {
                    setMovies(res.data.results);
                    setLoading(false);
                })
                .catch(err => {
                    if (err instanceof CanceledError) return;
                    setError(err.message)
                    setLoading(false);
                });
        }
    }, [genre])

    return { movies, error, isLoading }
}

export default useMovies;