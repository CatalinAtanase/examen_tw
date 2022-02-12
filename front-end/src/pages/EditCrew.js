import { Box, Button, Heading, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patch } from "../utils/useAxios";

function EditCrew({ movieList, setCrewList, crewList }) {
  let { id } = useParams();
  id = parseInt(id);
  const member = crewList.filter((m) => m.id == id)[0];
  const [name, setName] = useState(member.name);
  const [role, setRole] = useState(member.role);
  const [movie, setMovie] = useState(member.movieId);

  const navigate = useNavigate();

  const onChangeSelect = (e) => {
    setMovie(e.target.value);
  };

  async function onEditClick() {
    const member = {
      name: name,
      role: role,
      movieId: movie,
    };
    if (name && role && movie) {
      try {
        const response = await patch(`/crew/${id}`, { ...member });
        if (response.status === 200) {
          setCrewList((value) => {
            let newValue = crewList.filter((v) => v.id != id);
            newValue = [...newValue, response.data.crewMember];
            return newValue;
          });
          navigate("/crew");
        } else {
          alert("Invalid");
        }
      } catch (error) {
        alert("Error");
        console.log(error);
      }
    } else {
      alert("url invalid");
    }
  }

  return (
    <Box textAlign="center" marginBottom="2em">
      <Heading>Edit Crew Member</Heading>
      <Box width={"60vw"} marginX="auto" marginTop="2em">
        <Input
          placeholder="Title"
          marginBottom={"1em"}
          value={name}
          isRequired={true}
          onChange={(e) => setName(e.target.value)}
        />
        <Select
          placeholder="Select option"
          marginBottom={"1em"}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
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
      <Button colorScheme="green" marginTop="2em" onClick={onEditClick}>
        Edit
      </Button>
    </Box>
  );
}

export default EditCrew;
