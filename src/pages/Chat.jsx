import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const aiResponse = {
      from: "ai",
      text: "Thanks for sharing. How did that make you feel?", // Placeholder
    };

    setMessages((prev) => [...prev, userMessage, aiResponse]);
    setInput("");
  };

  return (
    <Box maxW="3xl" mx="auto" mt={8} p={4}>
      <Heading mb={4}>💬 Talk to Chester</Heading>
      <VStack spacing={4} align="stretch" mb={4}>
        {messages.map((msg, i) => (
          <Box
            key={i}
            bg={
              msg.from === "user"
                ? "blue.100"
                : useColorModeValue("gray.200", "gray.600")
            }
            p={3}
            borderRadius="md"
            alignSelf={msg.from === "user" ? "flex-end" : "flex-start"}
          >
            <Text>{msg.text}</Text>
          </Box>
        ))}
      </VStack>
      <HStack>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Chester something..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend} colorScheme="blue">
          Send
        </Button>
      </HStack>
    </Box>
  );
}
