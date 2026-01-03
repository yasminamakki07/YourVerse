import React, { useState, useEffect } from "react";
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
  Checkbox,
  useToast
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";   // ✅ NEW
import speak from "../assets/speak.jpg";
import lamp from "../assets/lamp.jpg";
import hands from "../assets/hands.png";

function Write() {
  const [quote, setQuote] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [sharePublicly, setSharePublicly] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();   // ✅ NEW

  // ✅ Check token
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");   // ✅ Redirect if not logged in
    }
  }, [token, navigate]);

  const handleSubmit = async () => {
  if (!quote.trim()) return;

  try {
    const response = await fetch("https://yourverse-backend.onrender.com/api/quotes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        content: quote.trim(),
        shared: sharePublicly
      })
    });

    const data = await response.json();

    if (response.ok) {
      setQuote("");
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 9000);

      toast({
        title: "Verse saved ✨",
        description: sharePublicly
          ? "Your words have been shared — thank you for inspiring others."
          : "Your verse is kept personal — a treasure just for you.",
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } else {
      toast({
        title: "Error",
        description: data.message || "Could not save your verse",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  } catch (err) {
    console.error(err);
    toast({
      title: "Server error",
      description: "Could not connect to backend",
      status: "error",
      duration: 5000,
      isClosable: true
    });
  }
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
      </VStack>

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
