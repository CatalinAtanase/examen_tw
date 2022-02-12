import { Box, Button, Heading, Input, Flex, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/useAxios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddMovie({ setMovieList }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState();

  const navigate = useNavigate();

  async function onAddClick() {
    const movie = {
      title,
      date,
      category
    };
    try {
      const response = await post("/movie/", { ...movie });
      if (response.status === 201) {
        setMovieList((value) => [...value, response.data.movie]);
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
      <Heading>Add Movie</Heading>
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
        <Select placeholder="Select option" marginBottom={"1em"} onChange={(e) => setCategory(e.target.value)}>
          <option value="actiune">Actiune</option>
          <option value="drama">Drama</option>
          <option value="comedie">Comedie</option>
        </Select>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
        <Button colorScheme="green" marginTop="2em" onClick={onAddClick}>
          Add Movie
        </Button>
      </Flex>
    </Box>
  );
}

export default AddMovie;
