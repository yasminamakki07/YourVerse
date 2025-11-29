import React, { useEffect, useState } from "react";
import { Box, Text, SimpleGrid, Button, VStack } from "@chakra-ui/react";

function Read({ quotes }) {
  const [storedQuotes, setStoredQuotes] = useState([]);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"; // ✅ check login
  const currentUserId = localStorage.getItem("currentUserId");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quotes") || "[]");
    // ✅ Only keep verses that are shared publicly
    const publicQuotes = saved.filter(q => q.shared !== false);
    setStoredQuotes(publicQuotes);
  }, [quotes]);

  const handleDelete = (index) => {
    const updatedQuotes = [...storedQuotes];
    const toDelete = updatedQuotes[index];
    updatedQuotes.splice(index, 1);

    // Update localStorage
    const allQuotes = JSON.parse(localStorage.getItem("quotes") || "[]");
    const filtered = allQuotes.filter(
      q => !(q.text === toDelete.text && q.userId === toDelete.userId)
    );
    localStorage.setItem("quotes", JSON.stringify(filtered));

    setStoredQuotes(updatedQuotes);
  };

  const handleEdit = (index) => {
    const newText = prompt("Edit your verse:", storedQuotes[index].text);
    if (newText && newText.trim()) {
      const updatedQuotes = [...storedQuotes];
      updatedQuotes[index].text = newText.trim();

      // Update localStorage
      const allQuotes = JSON.parse(localStorage.getItem("quotes") || "[]");
      const updatedAll = allQuotes.map((q) =>
        q.text === storedQuotes[index].text &&
        q.userId === storedQuotes[index].userId
          ? { ...q, text: newText.trim() }
          : q
      );
      localStorage.setItem("quotes", JSON.stringify(updatedAll));

      setStoredQuotes(updatedQuotes);
    }
  };

  const styles = [
    { bg: "#d8c3a5", borderRadius: "20px 0 20px 0", rotate: "-2deg" },
    { bg: "#e4d1b9", borderRadius: "0 20px 0 20px", rotate: "1deg" },
    { bg: "#c2a083", borderRadius: "30px", rotate: "-1deg" },
    { bg: "#b89f94", borderRadius: "0 30px 30px 0", rotate: "2deg" },
    { bg: "#a47148", borderRadius: "full", rotate: "-3deg" }
  ];

  return (
    <Box
      className="shared-bg"
      minH="calc(100vh - 120px)"
      px={[4, 6, 10]}
      py={[10, 16, 20]}
    >
      <Text
        fontSize={["lg", "2xl", "3xl", "4xl"]}
        fontWeight="bold"
        color="#f3e9dc"
        fontFamily="'Playfair Display', serif"
        mb={4}
        textAlign="center"
        letterSpacing="wide"
        textShadow="1px 1px #7B5E57"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        ✧ Traces of Thoughts ✧
      </Text>

      {storedQuotes.length === 0 ? (
        <Text
          fontSize="lg"
          color="#f3e9dc"
          textAlign="center"
          fontStyle="italic"
          mt={20}
        >
          No public thoughts have been traced yet. Be the first to leave a whisper.
        </Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={10} mt={8}>
          {storedQuotes.map((quote, index) => {
            const style = styles[index % styles.length];
            return (
              <Box
                key={index}
                bg={style.bg}
                p={6}
                borderRadius={style.borderRadius}
                transform={`rotate(${style.rotate})`}
                boxShadow="lg"
                transition="transform 0.3s ease"
                _hover={{ transform: "scale(1.05)" }}
                fontFamily="'Cormorant Garamond', serif"
              >
                <Text fontSize="lg" color="#5C4033" textAlign="center" mb={4}>
                  {quote.text}
                </Text>

                <VStack spacing={2}>
                  {/* ✅ Edit/Delete only if logged in AND verse belongs to current user */}
                  {isAuthenticated && quote.userId === currentUserId && (
                    <>
                      <Button
                        size="sm"
                        bg="#f3e9dc"
                        color="#5C4033"
                        fontFamily="'Cormorant Garamond', serif"
                        _hover={{ bg: "#e4d1b9" }}
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        bg="#f3e9dc"
                        color="#5C4033"
                        fontFamily="'Cormorant Garamond', serif"
                        _hover={{ bg: "#e4d1b9" }}
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </VStack>
              </Box>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default Read;
