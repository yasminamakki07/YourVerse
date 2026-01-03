import React from "react";
import {
  Box,
  Text,
  Icon,
  keyframes,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

function Home() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box className="shared-bg" minH="calc(100vh - 120px)" px={[4, 8, 10]} py={[10, 16, 20]}>
      <Stack
        direction={["column", "column", "row"]}
        spacing={[10, 16, 20]}
        align="center"
        justify="center"
      >
        {/* Left poetic staircase */}
        <Box flex="1" position="relative" w="100%">
          {[
            { text: "Welcome to Your Verse.", bg: "#d8c3a5", ml: 0, radius: "30px 0 30px 0" },
            { text: "A quiet space to read, write, and remember.", bg: "#e4d1b9", ml: 40, radius: "0 30px 0 30px" },
            { text: "Here, your thoughts are safe.", bg: "#c2a083", ml: 80, radius: "30px" },
            { text: "Your story matters. Your voice belongs.", bg: "#b89f94", ml: 120, radius: "0 40px 40px 0" }
          ].map(({ text, bg, ml, radius }, index) => (
            <Box
              key={index}
              bg={bg}
              p={[4, 6]}
              borderRadius={radius}
              boxShadow="md"
              maxW="500px"
              mb={6}
              ml={isMobile ? 0 : `${ml}px`}
              animation={`${fadeIn} ${1 + index * 0.5}s ease-out`}
              transition="transform 0.3s ease, box-shadow 0.3s ease"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "lg"
              }}
            >
              <Text
                fontSize={["md", "lg"]}
                color="#5C4033"
                fontFamily="'Playfair Display', serif"
                textAlign="center"
              >
                {text}
              </Text>
            </Box>
          ))}
        </Box>

        {/* Center floating hearts */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={10}
          ml={[0, 0, 10]}
          animation={`${pulse} 2.5s infinite`}
        >
          <Icon as={FaHeart} boxSize={[5, 6]} color="#e4d1b9" textShadow="0 0 4px #a47148" />
          <Icon as={FaHeart} boxSize={[6, 8]} color="#e4d1b9" textShadow="0 0 6px #a47148" />
          <Icon as={FaHeart} boxSize={[5, 6]} color="#e4d1b9" textShadow="0 0 4px #a47148" />
        </Box>

        {/* Right poetic sentence */}
        <Box flex="1" px={[4, 6]} w="100%">
          <Text
            fontSize={["2xl", "3xl", "4xl"]}
            fontStyle="italic"
            fontFamily="'Dancing Script', cursive"
            color="#f3e9dc"
            textAlign="center"
            textShadow="0 0 10px #a47148"
            animation={`${fadeIn} 2.5s ease-out`}
          >
            What will your verse be?
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}

export default Home;

