import {
  Box,
  Button,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Flex,
  Text,
  Select
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CrewCard from "../components/crew/CrewCard";
import { get, patch } from "../utils/useAxios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditMovie({ movieList, setMovieList, canEdit }) {
  let { id } = useParams();
  id = parseInt(id);
  const movie = movieList.filter((m) => m.id == id)[0];
  const [title, setTitle] = useState(movie.title);
  const [date, setDate] = useState(new Date(movie.date));
  const [category, setCategory] = useState(movie.category);
  const [crew, setCrew] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await get(`/crew/byMovie/${movie.id}/${offset}`);
        if (response.status === 200) {
          setCrew(response.data.rows);
          setCount((value) => value + 1);
          setTotalCount(response.data.count);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideos();
  }, []);

  const onNextPageClick = async () => {
    try {
      const response = await get(`/crew/byMovie/${movie.id}/${offset + 1}`);
      if (response.status === 200) {
        setOffset((value) => value + 1);
        setCount((value) => value + 1);
        setCrew(response.data.rows);
      }
    } catch (error) {
      alert("error");
    }
  };

  const onPreviousPageClick = async () => {
    try {
      const response = await get(`/crew/byMovie/${movie.id}/${offset - 1}`);
      if (response.status === 200) {
        setOffset((value) => value - 1);
        setCount((value) => value - 1);
        setCrew(response.data.rows);
      }
    } catch (error) {
      alert("error");
    }
  };

  async function onEditClick() {
    try {
      const response = await patch(`/movie/${movie.id}`, {
        title,
        category,
        date
      });
      if (response.status === 200) {
        setMovieList((value) => {
          let newMovie = movieList.filter((m) => m.id != id);
          newMovie = [...newMovie, response.data.movie];
          return newMovie;
        });
        navigate("/");
      } else {
        alert("Invalid");
      }
    } catch (error) {
      alert("Invalid");
      console.log(error);
    }
  }

  return (
    <Box textAlign="center" marginBottom="2em">
      <Heading>Edit Movie </Heading>
      <Text>{movie.title}</Text>
      <Flex
        width={"30vw"}
        marginX="auto"
        marginTop="2em"
        flexDirection={"column"}
      >
        <Input
          placeholder="Movie title"
          marginBottom={"1em"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select
          placeholder="Select option"
          marginBottom={"1em"}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="actiune">Actiune</option>
          <option value="drama">Drama</option>
          <option value="comedie">Comedie</option>
        </Select>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </Flex>
      <Button colorScheme="green" marginTop="2em" onClick={onEditClick}>
        Edit Movie
      </Button>
      <Box w="80vh" mx="auto">
        {crew.map((crew) => (
          <Box textAlign={"left"} key={crew.id}>
            <CrewCard crew={crew} canEdit={canEdit} />
          </Box>
        ))}
        {totalCount > 0 && (
          <Flex justifyContent={"space-between"}>
            <Button
              colorScheme="green"
              marginTop="2em"
              onClick={onPreviousPageClick}
              disabled={offset <= 0}
            >
              Previous page
            </Button>
            <Button
              colorScheme="green"
              marginTop="2em"
              onClick={onNextPageClick}
              disabled={totalCount <= count}
            >
              Next page
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
}

export default EditMovie;
