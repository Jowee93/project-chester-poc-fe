import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Textarea,
  Select,
  Checkbox,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const moods = ["Happy", "Sad", "Anxious", "Grateful", "Angry", "Calm"];
const reactions = ["Stressed", "Excited", "Tired", "Motivated", "Lonely"];

export default function AddEntry() {
  const [text, setText] = useState("");
  const [mood, setMood] = useState("");
  const [tags, setTags] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!text) {
      toast({
        title: "Entry is empty.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const entry = {
      id: Date.now(),
      text,
      date: new Date().toLocaleString(),
      mood,
      tags,
    };

    const existing = JSON.parse(localStorage.getItem("entries") || "[]");
    localStorage.setItem("entries", JSON.stringify([entry, ...existing]));

    toast({
      title: "Journal entry saved.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    navigate("/");
  };

  const toggleTag = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <Box maxW="lg" mx="auto" mt={8} p={6} borderWidth="1px" borderRadius="lg">
      <Heading mb={4}>New Journal Entry</Heading>
      <Textarea
        placeholder="Write your thoughts..."
        mb={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        minH="150px"
      />
      <Select
        placeholder="Select your mood"
        mb={4}
        onChange={(e) => setMood(e.target.value)}
      >
        {moods.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </Select>
      <VStack align="start" mb={4}>
        {reactions.map((tag) => (
          <Checkbox
            key={tag}
            isChecked={tags.includes(tag)}
            onChange={() => toggleTag(tag)}
          >
            {tag}
          </Checkbox>
        ))}
      </VStack>
      <Button colorScheme="blue" onClick={handleSubmit}>
        Save Entry
      </Button>
    </Box>
  );
}
