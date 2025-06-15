import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

async function getGPTResponse(message) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "Sorry, something went wrong.";
}

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const aiText = await getGPTResponse(input);
      const aiMessage = { from: "ai", text: aiText };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Sorry, I couldn't respond." },
      ]);
    } finally {
      setLoading(false);
    }
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
        {loading && (
          <Box
            bg={useColorModeValue("gray.100", "gray.700")}
            p={3}
            borderRadius="md"
            alignSelf="flex-start"
          >
            <HStack>
              <Spinner size="sm" />
              <Text>Chester is typing...</Text>
            </HStack>
          </Box>
        )}
      </VStack>
      <HStack>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Chester something..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend} colorScheme="blue" isDisabled={loading}>
          Send
        </Button>
      </HStack>
    </Box>
  );
}
