import {
  Box,
  Flex,
  Heading,
  Spacer,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Community from "./pages/Community";
import AddEntry from "./pages/AddEntry.jsx";
import EditEntry from "./pages/EditEntry";
import Chat from "./pages/Chat";

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle theme"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
    />
  );
}

export default function App() {
  const bg = useColorModeValue("gray.100", "gray.800");

  return (
    <Box minH="100vh" bg={bg}>
      <Flex
        as="nav"
        p={4}
        align="center"
        boxShadow="md"
        bg={useColorModeValue("white", "gray.900")}
      >
        <Heading size="md">
          <Link to="/">🧠 Project Chester</Link>
        </Heading>
        <Spacer />
        <Flex gap={4}>
          <Link to="/">Home</Link>
          <Link to="/community">Community</Link>
          <Link to="/chat">Chat</Link>
          <ColorModeToggle />
        </Flex>
      </Flex>

      <Box p={6}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/add" element={<AddEntry />} /> {/* ← new route */}
          <Route path="/edit/:id" element={<EditEntry />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Box>
    </Box>
  );
}
