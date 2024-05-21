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

    console.log(genre);
    useEffect(() => {
        setLoading(true);
        if (genre === '个性化推荐') {
            if (!user) {
                messageApi.open({
                    type: 'error',
                    content: '登录以获得个性化推荐',
                });
                return
            }

            axios.post(url + '/recommend', { username: user })
                .then(res => {
                    if (res.data.movies.length === 0) {
                        messageApi.open({
                            type: 'error',
                            content: '为你喜爱的电影评分来获得个性化推荐',
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
            let apiEndpoint = '/movie/';
            if (genre === '热门') apiEndpoint += 'popular';
            else if (genre === '高分') apiEndpoint += 'top_rated';
            else if (genre === '即将上映') apiEndpoint += 'upcoming';
            else if (genre === '正在上映') apiEndpoint += 'now_playing';
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