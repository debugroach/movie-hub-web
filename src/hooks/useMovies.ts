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

    if (genre === 'Popular') genre = 'popular';
    else if (genre === 'Top Rated') genre = 'top_rated';
    else if (genre === 'Upcoming') genre = 'upcoming';
    else if (genre === 'Now Playing') genre = 'now_playing';

    let apiEndpoint = genre ? '/movie/' + genre : '/movie/popular';
    console.log(genre);
    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        apiClient.get<FetchMoviesResponse>(apiEndpoint, { signal: controller.signal })
            .then(res => {
                setMovies(res.data.results);
                setLoading(false);
            })
            .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message)
                setLoading(false);
            });

        return () => controller.abort()
    }, [genre])

    return { movies, error, isLoading }
}

export default useMovies;