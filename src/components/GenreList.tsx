import { Button, List, ListItem } from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
interface Props {
    onSelectGenre: (genre: string) => void;
    selectedGenre: string | null;
}


const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
    const { genres } = useGenres();

    return (
        <List>
            {genres.map((genre) => (
                <ListItem key={genre} paddingY="5px">
                    <Button
                        whiteSpace="normal"
                        textAlign="left"
                        fontWeight={genre === selectedGenre ? "bold" : "normal"}
                        onClick={() => onSelectGenre(genre)}
                        fontSize="md"
                        variant="link"
                    >
                        {genre}
                    </Button>
                </ListItem>
            ))}
        </List>
    )
}

export default GenreList;