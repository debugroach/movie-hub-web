import React, { useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Movie {
    id: number,
    title: string,
    poster_path: string,
    backdrop_path: string,
}

interface FetchMovieResponse {
    count: number
    results: Movie[]
}
const useMovies = () => {
    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [error, setError] = React.useState('');


    useEffect(() => {
        const controller = new AbortController();

        apiClient.get<FetchMovieResponse>('/movie/top_rated', { signal: controller.signal })
            .then(res => setMovies(res.data.results))
            .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message)
            });

        return () => controller.abort()
    }, [])

    return { movies, error }
}

export default useMovies;