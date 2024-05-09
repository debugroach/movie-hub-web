import { Card, CardBody, Heading, HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Movie } from '../hooks/useMovies'
import CriticScore from './CriticScore'
import RateModal from './RateModal'


interface Props {
  movie: Movie
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Card>
      <Image src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path} />
      <CardBody>
        <HStack justifyContent='space-between' marginBottom={3}>
          <RateModal movie={movie} />
          <CriticScore score={movie.vote_average} />
        </HStack>
        <Heading fontSize='2xl'>{movie.title}</Heading>
      </CardBody>
    </Card>
  )
}

export default MovieCard;