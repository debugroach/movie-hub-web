import { Card, CardBody, Skeleton, SkeletonText } from '@chakra-ui/react'

const MovieCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="200px" borderRadius={10} overflow="hidden" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  )
}

export default MovieCardSkeleton