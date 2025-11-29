import React, { useState } from "react";
import {
  Box,
  Text,
  Textarea,
  Button,
  VStack,
  Alert,
  AlertIcon,
  Image,
  HStack,
  useBreakpointValue,
  Checkbox
} from "@chakra-ui/react";
import speak from "../assets/speak.jpg";
import lamp from "../assets/lamp.jpg";
import hands from "../assets/hands.png";

function Write() {
  const [quote, setQuote] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [sharePublicly, setSharePublicly] = useState(true); // ✅ toggle

  // ✅ Check if user is logged in
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const currentUserId = localStorage.getItem("currentUserId");

  const handleSubmit = () => {
    if (!quote.trim()) return;

    const newQuote = {
      text: quote.trim(),
      shared: sharePublicly, 
      userId: currentUserId 
      
    };

    const storedQuotes = JSON.parse(localStorage.getItem("quotes") || "[]");
    const updatedQuotes = [...storedQuotes, newQuote];
    localStorage.setItem("quotes", JSON.stringify(updatedQuotes));

    setQuote("");
    setShowThankYou(true);

    setTimeout(() => setShowThankYou(false), 9000);
  };

  const paddingX = useBreakpointValue({ base: 4, md: 10 });
  const paddingY = useBreakpointValue({ base: 10, md: 20 });
  const imageSize = useBreakpointValue({
    base: "70px",
    sm: "90px",
    md: "120px",
    lg: "150px"
  });
  const buttonFontSize = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <Box
      className="shared-bg"
      minH="calc(100vh - 120px)"
      px={paddingX}
      py={paddingY}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <VStack
        spacing={6}
        bg="#f3e9dc"
        p={[6, 8, 10]}
        borderRadius="xl"
        boxShadow="xl"
        maxW="600px"
        w="100%"
        fontFamily="'Cormorant Garamond', serif"
      >
        <Text
          fontSize={["xl", "2xl"]}
          fontWeight="bold"
          color="#5C4033"
          textAlign="center"
        >
          Let your thoughts unfold like a letter
        </Text>

        {isAuthenticated ? (
          <>
            <Textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Your words are important...."
              size="lg"
              resize="none"
              minH="150px"
              fontSize={["md", "lg"]}
              borderRadius="md"
              bg="#fffaf3"
              color="#5C4033"
              _placeholder={{ color: "#a47148" }}
            />

            <Checkbox
              isChecked={sharePublicly}
              onChange={(e) => setSharePublicly(e.target.checked)}
              color="#5C4033"
            >
              Share publicly
            </Checkbox>

            <Button
              onClick={handleSubmit}
              bg="#a47148"
              color="#f3e9dc"
              px={8}
              py={6}
              fontSize={buttonFontSize}
              borderRadius="full"
              width={["100%", "auto"]}
              _hover={{ transform: "scale(1.05)" }}
              _active={{ transform: "scale(1.1)", bg: "#a47148" }}
            >
              Pin Your Thought
            </Button>

            {showThankYou && (
              <Alert
                status="success"
                borderRadius="md"
                bg="#d8c3a5"
                color="#5C4033"
                fontSize="md"
                fontFamily="'Cormorant Garamond', serif"
                textAlign="center"
              >
                <AlertIcon />
                {sharePublicly
                  ? "Your words have been shared — thank you for inspiring others ✨"
                  : "Your verse is kept personal — a treasure just for you ❤️"}
              </Alert>
            )}
          </>
        ) : (
          <Text
            color="#7B5E57"
            fontSize="lg"
            textAlign="center"
            fontStyle="italic"
          >
            You must log in to write a verse ✨
          </Text>
        )}
      </VStack>

      {/* Images always side-by-side and shrink on small screens */}
      <HStack spacing={[4, 6, 10]} mt={10} justify="center" wrap="wrap">
        <Image
          src={speak}
          alt="speak"
          boxSize={imageSize}
          filter="drop-shadow(0 0 6px #a47148)"
        />
        <Image
          src={lamp}
          alt="lamp"
          boxSize={imageSize}
          filter="drop-shadow(0 0 6px #a47148)"
        />
        <Image
          src={hands}
          alt="hands"
          boxSize={imageSize}
          filter="drop-shadow(0 0 6px #a47148)"
        />
      </HStack>
    </Box>
  );
}

export default Write;
