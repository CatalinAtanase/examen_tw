import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import CrewCard from "./CrewCard";

function CrewList({ crewList, setCrewList, crewName, canEdit }) {
  return (
    <Box>
      <Flex wrap={"wrap"}>
        {crewList.map((a) => {
          if (a.name.includes(crewName))
            return (
              <CrewCard
                key={a.id}
                crew={a}
                setCrewList={setCrewList}
                canEdit={canEdit}
              />
            );
        })}
      </Flex>
    </Box>
  );
}

export default CrewList;
