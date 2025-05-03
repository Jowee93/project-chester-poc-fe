import { Box, Text, Button, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function JournalEntry({ entry, onDelete }) {
  const navigate = useNavigate();

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      bg="gray.50"
      _dark={{ bg: "gray.700" }}
      shadow="sm"
    >
      <Flex direction="column" gap={2}>
        <Text>{entry.text}</Text>
        <Flex fontSize="sm" color="gray.500" align="center">
          <Text>{entry.date}</Text>
          <Spacer />
          <Button
            size="sm"
            colorScheme="gray"
            variant="outline"
            mr={2}
            onClick={() => navigate(`/edit/${entry.id}`)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            variant="outline"
            onClick={() => onDelete(entry.id)}
          >
            Delete
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
