import React from "react";
import { Box, Text, SimpleGrid, Image, useBreakpointValue, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import lesmis from "../assets/lesmis.jpg";
import harrypotter from "../assets/harrypotter.jpg";
import hobbit from "../assets/hobbit.jpg";
import deadpoets from "../assets/deadpoets.jpg";

const MotionBox = motion(Box);
const MotionText = motion(Text);

const writings = [
  {
    title: "Victor Hugo – Les Misérables",
    quote: "There is nothing like a dream to create the future.",
    impact:
      "Hugo’s masterpiece exposed injustice and poverty, inspiring reforms and reminding readers of the power of hope.",
    image: lesmis
  },
  {
    title: "J.K. Rowling – Harry Potter",
    quote: "It is our choices that show what we truly are, far more than our abilities.",
    impact:
      "Rowling’s series reshaped modern fantasy, teaching courage, friendship, and resilience to generations worldwide.",
    image: harrypotter
  },
  {
    title: "J.R.R. Tolkien – The Hobbit",
    quote: "Even the smallest person can change the course of the future.",
    impact:
      "Tolkien’s tale of adventure and courage opened the door to epic fantasy, inspiring countless writers and readers.",
    image: hobbit
  },
  {
    title: "Nancy Kleinbaum – Dead Poets Society",
    quote: "Carpe diem. Seize the day. Make your lives extraordinary.",
    impact:
      "Adapted from the film, Kleinbaum’s novel celebrates poetry, individuality, and the courage to live authentically.",
    image: deadpoets
  }
];

function Impact() {
  const paddingX = useBreakpointValue({ base: 4, md: 10 });
  const paddingY = useBreakpointValue({ base: 10, md: 20 });
  const boxPadding = useBreakpointValue({ base: 4, md: 6, lg: 8 });
  const titleFontSize = useBreakpointValue({ base: "lg", md: "2xl", lg: "4xl" });
  const imageSize = useBreakpointValue({ base: "80px", md: "120px", lg: "150px" });

  return (
    <Box
      className="shared-bg"
      minH="100vh"
      px={paddingX}
      py={paddingY}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <MotionText
        fontSize={titleFontSize}
        fontWeight="bold"
        color="#f3e9dc"
        fontFamily="'Playfair Display', serif"
        letterSpacing="wide"
        textAlign="center"
        mb={12}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        ✧ The Impact of a Word ✧
      </MotionText>

      <SimpleGrid columns={[1, 1, 2]} spacing={10} maxW="1200px" w="100%">
        {writings.map((item, index) => (
          <MotionBox
            key={index}
            bg="#f3e9dc"
            p={boxPadding}
            borderRadius="20px"
            fontFamily="'Cormorant Garamond', serif"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 + index * 0.2 }}
            _hover={{}}
          >
            <HStack spacing={6} align="flex-start">
              <Image
                src={item.image}
                alt={item.title}
                boxSize={imageSize}
                objectFit="cover"
                borderRadius="md"
              />
              <Box>
                <Text
                  fontSize={["lg", "xl", "2xl"]}
                  color="#1a1a1a"
                  textAlign="left"
                  mb={3}
                  fontWeight="bold"
                >
                  {item.title}
                </Text>
                <Text
                  fontSize={["md", "lg", "xl"]}
                  color="#1a1a1a"
                  textAlign="left"
                  fontStyle="italic"
                  mb={4}
                  fontWeight="semibold"
                >
                  “{item.quote}”
                </Text>
                <Text
                  fontSize={["sm", "md", "lg"]}
                  color="#1a1a1a"
                  textAlign="left"
                  fontWeight="medium"
                  lineHeight="1.6"
                >
                  {item.impact}
                </Text>
              </Box>
            </HStack>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Impact;
