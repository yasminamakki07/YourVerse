import React from "react";
import { Box, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionText = motion(Text);
const MotionBox = motion(Box);

function About() {
  const quoteFontSize = useBreakpointValue({ base: "md", md: "lg" });
  const monologueFontSize = useBreakpointValue({ base: "lg", md: "xl" });
  const paddingX = useBreakpointValue({ base: 4, md: 10 });
  const paddingY = useBreakpointValue({ base: 10, md: 20 });

  return (
    <Box
      className="shared-bg"
      minH="calc(100vh - 120px)"
      px={paddingX}
      py={paddingY}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={[8, 10]} maxW="800px" w="100%">
        <MotionBox
          bg="#f3e9dc"
          p={[6, 8]}
          borderRadius="xl"
          boxShadow="xl"
          fontFamily="'Cormorant Garamond', serif"
          border="1px solid #d8cfc4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Text
            fontSize={quoteFontSize}
            color="#5C4033"
            textAlign="center"
            lineHeight="1.8"
            textShadow="0 0 6px #a47148"
          >
            “We don’t read and write poetry because it’s cute , we read and write poetry because we are members of the human race, and the human race... is Filled of Passion.”
          </Text>
        </MotionBox>

        <VStack spacing={[3, 4]}>
          {[
            "These words are not just lines from a film — they are a truth we often forget.",
            "Words are emotions, emotions that ache to be heard, to be felt, to be understood.",
            "So this place — Your Verse — was created with love.",
            "A place where you can share anything from your heart, and read the hearts of others.",
            "Because your voice matters, your feelings matter, and your verse... belongs here."
          ].map((line, index) => (
            <MotionText
              key={index}
              fontSize={monologueFontSize}
              color="#f3e9dc"
              fontFamily="'Cormorant Garamond', serif"
              textAlign="center"
              lineHeight="1.8"
              textShadow="0 0 8px #a47148"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 + index * 0.4 }}
            >
              {line}
            </MotionText>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}

export default About;
