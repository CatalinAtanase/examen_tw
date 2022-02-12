import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MovieList from "../components/movie/MovieList";

function Home({ movieList, setMovieList }) {
  const [title, setTitle] = useState("");

  return (
    <Box>
      <Box textAlign="left" marginBottom="2em">
        <Heading textAlign="center">Movies</Heading>

        <Box width="30vw" mr="auto" mt="1em">
          <Text as="h4" textAlign={"left"}>
            Filter by title
          </Text>
          <Input
            placeholder="Title"
            marginBottom={"1em"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Link to="/movie/add">
            <Button colorScheme="green" marginBottom="1em" textAlign={"left"}>
              Add Movie
            </Button>
          </Link>
        </Box>
      </Box>

      <MovieList
        movieList={movieList}
        setMovieList={setMovieList}
        title={title}
      />
    </Box>
  );
}

export default Home;
