import { Button, Card, CardBody, Heading, HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Movie } from '../hooks/useMovies'
import { HeartFilled } from '@ant-design/icons'
import { color } from 'framer-motion'


interface Props {
  movie: Movie
}

const MovieCard = ({ movie }: Props) => {
  const [color, setColor] = React.useState('white');

  const handleClick = () => {
    console.log('clicked')
    if (color === 'red')
      setColor('white')
    else setColor('red')
    console.log(color)
  };

  return (
    <Card>
      <Image src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path} />
      <CardBody>
        <HStack justifyContent='space-between' marginBottom={3}>
          {/* <PlatformIconList platforms={movie.parent_platforms?.map(p => p.platform)} />
          <CriticScore score={movie.metacritic} /> */}
          <Button borderRadius='lg' colorScheme='red' variant='ghost' onClick={() => handleClick()}>
            <HeartFilled style={{ color: color }} />
          </Button>
        </HStack>
        <Heading fontSize='2xl'>{movie.title}</Heading>
      </CardBody>
    </Card>
  )
}

export default MovieCard;