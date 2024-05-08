import { SimpleGrid, Text } from "@chakra-ui/react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSklecton";
import MovieCardContainer from "./MovieCardContainer";

interface Props {
    genre: string | null;
}

const MovieGrid = ({ genre }: Props) => {
    const { movies, error, isLoading } = useMovies({ genre });
    const skeletons = [1, 2, 3, 4, 5, 6];

    return (
        <>
            {error && (<Text>{error}</Text>)}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} padding="10px"
                spacing={6}>
                {isLoading &&
                    skeletons.map((skeleton) => (
                        <MovieCardContainer key={skeleton}>
                            <MovieCardSkeleton />
                        </MovieCardContainer>
                    ))}
                {movies.map(movie => (
                    <MovieCardContainer key={movie.id} >
                        <MovieCard movie={movie} />
                    </MovieCardContainer>
                ))}
            </SimpleGrid>
        </>
    )
}

export default MovieGrid;