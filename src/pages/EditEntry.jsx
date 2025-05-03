import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

const moods = ["Happy", "Sad", "Anxious", "Grateful", "Angry", "Calm"];
const reactions = ["Stressed", "Excited", "Tired", "Motivated", "Lonely"];

export default function EditEntry() {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [mood, setMood] = useState("");
  const [tags, setTags] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("entries") || "[]");
    const entry = existing.find((e) => e.id === Number(id));
    if (entry) {
      setText(entry.text);
      setMood(entry.mood || "");
      setTags(entry.tags || []);
    }
  }, [id]);

  const handleSubmit = () => {
    const updatedEntry = {
      id: Number(id),
      text,
      date: new Date().toLocaleString(),
      mood,
      tags,
    };

    const existing = JSON.parse(localStorage.getItem("entries") || "[]");
    const updated = existing.map((e) =>
      e.id === Number(id) ? updatedEntry : e
    );
    localStorage.setItem("entries", JSON.stringify(updated));

    toast({
      title: "Entry updated.",
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
      <Heading mb={4}>Edit Journal Entry</Heading>
      <Textarea
        placeholder="Update your thoughts..."
        mb={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        minH="150px"
      />
      <Select
        placeholder="Select your mood"
        mb={4}
        value={mood}
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
        Save Changes
      </Button>
    </Box>
  );
}
