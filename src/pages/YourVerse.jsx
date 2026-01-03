import React, { useState } from "react";
import {
  Box,
  Text,
  Image,
  HStack,
  Button,
  useBreakpointValue
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import moon from "../assets/moon.png";
import heart from "../assets/heart.jpg";
import seize from "../assets/seize.jpg";

const MotionImage = motion(Image);
const MotionBox = motion(Box);

// ✅ Quotes moved outside the component for easier backend replacement later
const quotes = [
  "Carpe diem. Seize the day. Make your lives extraordinary.",
  "No matter what anybody tells you, words and ideas can change the world.",
  "Just when you think you know something, you have to look at it in another way.",
  "There’s a time for daring and there’s a time for caution, and a wise man understands which is called for.",
  "We all deserve to be heard, understood, and loved.",
  "Know your potential.",
  "God created you, that is a proof of how much you are important.",
  "You must strive to find your own voice.",
  "Even the bitterest tangerine carries a hint of sweetness — just like life.",
  "Even if you’re broken, you can still be kind. That’s what makes you beautiful.",
  "You’re braver than you believe, stronger than you seem, and smarter than you think.",
  "Even the darkest night will end and the sun will rise.",
  "I stand on my desk to remind myself to look at things differently."
];

function YourVerse() {
  const [quote, setQuote] = useState("");

  const handleNewQuote = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  };

  const imageSize = useBreakpointValue({ base: "80px", sm: "100px", md: "120px", lg: "150px" });
  const boxPadding = useBreakpointValue({ base: 4, md: 6, lg: 8 });
  const fontSize = useBreakpointValue({ base: "md", md: "lg", lg: "xl" });

  return (
    <Box
      className="shared-bg"
      minH="calc(100vh - 120px)"
      px={[4, 6, 10]}
      py={[10, 16, 20]}
      position="relative"
    >
      {/* Image row */}
      <HStack spacing={[4, 6, 8]} justify="center" mb={10} wrap="nowrap" overflowX="auto">
        <MotionImage
          src={heart}
          alt="heart"
          boxSize={imageSize}
          borderRadius="lg"
          objectFit="cover"
          boxShadow="md"
          flexShrink={0}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
        <MotionImage
          src={seize}
          alt="seize"
          boxSize={imageSize}
          borderRadius="lg"
          objectFit="cover"
          boxShadow="md"
          flexShrink={0}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        />
        <MotionImage
          src={moon}
          alt="moon"
          boxSize={imageSize}
          borderRadius="lg"
          objectFit="cover"
          boxShadow="md"
          flexShrink={0}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        />
      </HStack>

      {/* Button */}
      <Box textAlign="center" mt={4}>
        <Button
          onClick={handleNewQuote}
          bg="#a47148"
          color="#f3e9dc"
          px={8}
          py={6}
          fontSize={["md", "lg", "xl"]}
          fontWeight="bold"
          fontFamily="'Cormorant Garamond', serif"
          _hover={{ transform: "scale(1.1)" }}
          _active={{ transform: "scale(1.15)", bg: "#a47148" }}
        >
          Reveal today’s verse
        </Button>
      </Box>

      {/* Quote display */}
      {quote && (
        <MotionBox
          bg="#f3e9dc"
          p={boxPadding}
          borderRadius="xl"
          fontFamily="'Cormorant Garamond', serif"
          maxW="700px"
          mx="auto"
          mt={10}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Text
            fontSize={fontSize}
            color="#5C4033"
            textAlign="center"
            lineHeight="1.8"
          >
            “{quote}”
          </Text>
        </MotionBox>
      )}
    </Box>
  );
}

export default YourVerse;
