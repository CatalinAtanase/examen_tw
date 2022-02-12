import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { remove } from "../../utils/useAxios";

function CrewCard({ crew, setCrewList, canEdit }) {
  const onDeleteClick = async () => {
    try {
      const response = await remove(`/crew/${crew.id}`);
      if (response.status == 200) {
        if (setCrewList) {
          setCrewList((oldValue) => {
            const value = oldValue.filter((c) => c.id != crew.id);
            return value;
        });
        }
      }
    } catch (error) {
      alert("error");
    }
  };

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
          {crew.name}
        </Box>
        <Box
          mt="1"
          lineHeight="tight"
          isTruncated
        >
          Role: {crew.role}
        </Box>
        {canEdit && (
          <Box>
            <Link to={`/crew/edit/${crew.id}`}>
              <Button colorScheme="blue" marginTop="2em" size={"sm"} mr="1em">
                Edit crew
              </Button>
            </Link>
            <Button
              colorScheme="red"
              marginTop="2em"
              size={"sm"}
              onClick={onDeleteClick}
            >
              Delete crew
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CrewCard;
