import { SimpleGrid, Text } from "@chakra-ui/react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";

const MovieGrid = () => {
    const { movies, error } = useMovies();

    return (
        <>
            {error && (<Text>{error}</Text>)}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} padding="10px"
                spacing={6}>
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </SimpleGrid>
        </>
    )
}

export default MovieGrid;