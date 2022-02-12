import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movieList, setMovieList, title }) {
  return (
    <Box>
      <Flex wrap={"wrap"}>
        {movieList.map((m) => {
          if (m.title.includes(title))
            return <MovieCard
              movie={m}
              key={m.id}
              setMovieList={setMovieList}
            />;
        })}
      </Flex>
    </Box>
  );
}

export default MovieList;
