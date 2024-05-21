import { Card, CardBody, Heading, HStack, Image, Text } from '@chakra-ui/react'
import { Movie } from '../hooks/useMovies'
import CriticScore from './CriticScore'
import RateModal from './RateModal'


interface Props {
  user: string | null;
  movie: Movie
}

const MovieCard = ({ user, movie }: Props) => {
  return (
    <Card  >
      <Image src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path} />
      <CardBody>
        <Heading fontSize='2xl'>{movie.title}</Heading>
        <HStack marginTop={3} justifyContent={"space-between"}>
          <HStack>
            <Text fontSize='md'>平均评分：</Text>
            <CriticScore score={movie.vote_average} />
          </HStack>
          <RateModal user={user} movie={movie} />
        </HStack>
      </CardBody>
    </Card>
  )
}

export default MovieCard;