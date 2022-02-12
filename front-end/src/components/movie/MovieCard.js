import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { remove } from "../../utils/useAxios";


function MovieCard({ movie, setMovieList }) {

  const onDeleteClick = async () => {
    try {
      const response = await remove(`/movie/${movie.id}`)
      if(response.status == 200) {
        setMovieList(value => {
          const newValue = value.filter(m => m.id != movie.id)
          return newValue
        })
      } 
    } catch (error) {
      alert('error')
    }
  }

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      marginRight="2em"
      mt={"1em"}
    >
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {movie.title}
        </Box>
        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" color="gray.600" fontSize="sm">
            Cinema: {movie.date}
          </Box>
        </Box>
        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" color="gray.600" fontSize="sm">
            Category: {movie.category}
          </Box>
        </Box>
        <Link to={`/movie/edit/${movie.id}`} >
          <Button colorScheme="blue" marginTop="2em" size={"sm"} mr="1em">
            Edit Movie
          </Button>
        </Link>
        <Button colorScheme="red" marginTop="2em" size={"sm"} onClick={onDeleteClick}>
          Delete Movie
        </Button>
      </Box>
    </Box>
  );
}

export default MovieCard;
