import React, { useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

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
    genre: string | null;
}
const useMovies = ({ genre }: Props) => {
    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [error, setError] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);

    let apiEndpoint = '/movie/';
    if (genre === 'Popular') apiEndpoint += 'popular';
    else if (genre === 'Top Rated') apiEndpoint += 'top_rated';
    else if (genre === 'Upcoming') apiEndpoint += 'upcoming';
    else if (genre === 'Now Playing') apiEndpoint += 'now_playing';
    else apiEndpoint += 'top_rated';

    console.log(genre);
    useEffect(() => {
        setLoading(true);

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

    }, [genre])

    return { movies, error, isLoading }
}

export default useMovies;