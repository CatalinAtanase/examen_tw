import { Box, Button, Heading, Text, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CrewList from "../components/crew/CrewList";

function CrewPage({ crewList, setCrewList, canEdit }) {
  const [crewName, setCrewName] = useState("");

  return (
    <Box>
      <Box textAlign="left" marginBottom="2em">
        <Heading textAlign={"center"}>Crew Members</Heading>
        <Box width="30vw" mr="auto" mt="1em">
          <Text as="h4">Filter by member name</Text>
          <Input
            placeholder="Member name"
            marginBottom={"1em"}
            value={crewName}
            onChange={(e) => setCrewName(e.target.value)}
          />
        </Box>
        <Link to="/crew/add">
          <Button colorScheme="green" marginBottom="1em">
            Add Crew Member
          </Button>
        </Link>
      </Box>
      <CrewList
        crewList={crewList}
        setCrewList={setCrewList}
        crewName={crewName}
        canEdit={canEdit}
      />
    </Box>
  );
}

export default CrewPage;
