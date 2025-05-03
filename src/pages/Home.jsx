import React, { useState, useEffect } from "react";
import { Box, Heading, Button, VStack } from "@chakra-ui/react";
import JournalEntry from "../components/JournalEntry";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  const [entries, setEntries] = useState(() => {
    return JSON.parse(localStorage.getItem("entries") || "[]");
  });

  const addEntry = () => {
    const text = prompt("Write your thoughts:");
    if (text) {
      const newEntry = {
        id: Date.now(),
        text,
        date: new Date().toLocaleString(),
      };
      setEntries([newEntry, ...entries]);
    }
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  return (
    <Box p={6} maxW="3xl" mx="auto">
      <Heading mb={4}>My Journal</Heading>
      <Button as={RouterLink} to="/add" colorScheme="blue" mb={6}>
        + New Entry
      </Button>
      <VStack spacing={4} align="stretch">
        {entries.map((entry) => (
          <JournalEntry key={entry.id} entry={entry} onDelete={deleteEntry} />
        ))}
      </VStack>
    </Box>
  );
}

export const getLatestJournalText = () => {
  const stored = JSON.parse(localStorage.getItem("entries") || "[]");
  return stored.length ? stored[0].text : "";
};
