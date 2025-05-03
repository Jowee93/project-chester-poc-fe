import React, { useEffect, useState } from "react";
import posts from "../data/redditPosts.json";
import { getSimilarityScore } from "../utils/similarity";
import { getLatestJournalText } from "./Home";
import {
  Box,
  Heading,
  Text,
  Tag,
  Button,
  VStack,
  HStack,
  Divider,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

const allTags = [
  "all",
  "anxiety",
  "self-esteem",
  "loneliness",
  "life change",
  "panic",
];

export default function Community() {
  const [communityPosts, setCommunityPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [similarPosts, setSimilarPosts] = useState([]);

  useEffect(() => {
    setCommunityPosts(posts);
  }, []);

  const filteredPosts =
    selectedTag === "all"
      ? communityPosts
      : communityPosts.filter((post) => post.tags.includes(selectedTag));

  const findSimilarPosts = () => {
    const latestText = getLatestJournalText();
    if (!latestText) {
      alert("No journal entry found.");
      return;
    }

    const matches = posts
      .map((post) => ({
        ...post,
        score: getSimilarityScore(latestText, post.content),
      }))
      .filter((post) => post.score > 0.1)
      .sort((a, b) => b.score - a.score);

    setSimilarPosts(matches);
  };

  return (
    <Box p={6} maxW="4xl" mx="auto">
      <Heading mb={4}>Community Reflections</Heading>

      <HStack spacing={3} mb={6} wrap="wrap">
        {allTags.map((tag) => (
          <Button
            key={tag}
            size="sm"
            variant={selectedTag === tag ? "solid" : "outline"}
            colorScheme={selectedTag === tag ? "blue" : "gray"}
            onClick={() => setSelectedTag(tag)}
          >
            #{tag}
          </Button>
        ))}
      </HStack>

      <Button onClick={findSimilarPosts} colorScheme="purple" mb={6}>
        🔍 Find Posts Related to My Journal
      </Button>

      <VStack spacing={4} align="stretch">
        {filteredPosts.map((post) => (
          <Box
            key={post.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="sm"
            bg={useColorModeValue("white", "gray.700")}
          >
            <Heading size="md" mb={2}>
              {post.title}
            </Heading>
            <Text mb={2}>{post.content}</Text>
            <Text fontSize="sm" color="gray.500">
              Tags:{" "}
              {post.tags.map((t, i) => (
                <Tag key={i} mr={1}>
                  {t}
                </Tag>
              ))}
            </Text>
            <Text fontSize="sm">❤️ {post.upvotes}</Text>
          </Box>
        ))}
      </VStack>

      {similarPosts.length > 0 && (
        <Box mt={10}>
          <Heading size="lg" mb={4}>
            🔗 Similar Posts:
          </Heading>
          <VStack spacing={4} align="stretch">
            {similarPosts.map((post) => (
              <Box
                key={post.id}
                p={4}
                borderWidth="1px"
                borderStyle="dashed"
                borderColor="gray.400"
                borderRadius="md"
                bg={useColorModeValue("white", "gray.700")}
              >
                <Heading size="sm" mb={1}>
                  {post.title}
                </Heading>
                <Text mb={1}>{post.content}</Text>
                <Text
                  fontSize="sm"
                  color={useColorModeValue("white", "gray.300")}
                >
                  Match Score: {post.score.toFixed(2)}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
}
