import { Box, Button, Heading, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/useAxios";

function AddCrew({ movieList, setCrewList }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [movie, setMovie] = useState();

  const navigate = useNavigate();

  const onChangeSelect = (e) => {
    setMovie(e.target.value);
  };

  async function onAddClick() {
    const member = {
      name: name,
      role: role,
      movieId: movie,
    };
    if (name && role && movie) {
      try {
        const response = await post("/crew/", { ...member });
        if (response.status === 201) {
          setCrewList((value) => [...value, response.data.crewMember]);
          navigate("/crew");
        } else {
          alert("Invalid");
        }
      } catch (error) {
        alert("error");
        console.log(error);
      }
    } else {
      alert("invalid");
    }
  }

  return (
    <Box textAlign="center" marginBottom="2em">
      <Heading>Add Crew Member</Heading>
      <Box width={"60vw"} marginX="auto" marginTop="2em">
        <Input
          placeholder="Name"
          marginBottom={"1em"}
          value={name}
          isRequired={true}
          onChange={(e) => setName(e.target.value)}
        />
        <Select placeholder="Select option" marginBottom={"1em"} onChange={(e) => setRole(e.target.value)}>
          <option value="Director">Director</option>
          <option value="Writer">Writer</option>
          <option value="Cascador">Cascador</option>
        </Select>
        <Select
          placeholder="Movie"
          onChange={onChangeSelect}
          isRequired={true}
          defaultValue={movie}
        >
          {movieList.map((m) => (
            <option value={m.id} key={m.id}>
              {m.title}
            </option>
          ))}
        </Select>
      </Box>
      <Button colorScheme="green" marginTop="2em" onClick={onAddClick}>
        Add Crew Member
      </Button>
    </Box>
  );
}

export default AddCrew;
