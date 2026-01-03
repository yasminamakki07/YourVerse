import React, { useEffect, useState } from "react";
import { Box, Text, SimpleGrid, VStack, Spinner, Button, useToast } from "@chakra-ui/react";
import API_BASE_URL from "../config";


function MyPersonalVerses() {
  const [personalQuotes, setPersonalQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/quotes/my`, { headers: { Authorization: `Bearer ${token}` } })

        const data = await response.json();

        if (response.ok) {
          setPersonalQuotes(data);
        } else {
          toast({
            title: "Error fetching verses",
            description: data.message || "Could not load your personal verses",
            status: "error",
            duration: 4000,
            isClosable: true
          });
        }
      } catch (err) {
        console.error("Server error:", err);
        toast({
          title: "Server error",
          description: "Could not connect to backend",
          status: "error",
          duration: 4000,
          isClosable: true
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [token, toast]);

  const handleEdit = async (id, oldContent) => {
    const newText = prompt("Edit your verse:", oldContent);
    if (!newText || !newText.trim()) return;

    try {
     const response = await fetch(`${API_BASE_URL}/api/quotes/${id}`, { method: "PUT", headers: 
        { 
       "Content-Type": "application/json", Authorization: `Bearer ${token}`
        }, body: JSON.stringify({ content: newText.trim() }) });

      const data = await response.json();

      if (response.ok) {
        setPersonalQuotes((prev) =>
          prev.map((q) => (q.id === id ? { ...q, content: newText.trim() } : q))
        );
        toast({ title: "Verse updated ✨", status: "success", duration: 4000, isClosable: true });
      } else {
        toast({
          title: "Error updating verse",
          description: data.message,
          status: "error",
          duration: 4000,
          isClosable: true
        });
      }
    } catch (err) {
      console.error("Error editing quote:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this verse?")) return;

    try {
     const response = await fetch(`${API_BASE_URL}/api/quotes/${id}`,
    { method: "DELETE", headers: { Authorization: `Bearer ${token}` }
    });

      const data = await response.json();

      if (response.ok) {
        setPersonalQuotes((prev) => prev.filter((q) => q.id !== id));
        toast({ title: "Verse deleted ✨", status: "success", duration: 4000, isClosable: true });
      } else {
        toast({
          title: "Error deleting verse",
          description: data.message,
          status: "error",
          duration: 4000,
          isClosable: true
        });
      }
    } catch (err) {
      console.error("Error deleting quote:", err);
    }
  };

  const styles = [
    { bg: "#f3e9dc", borderRadius: "20px 0 20px 0", rotate: "-2deg" },
    { bg: "#fffaf3", borderRadius: "0 20px 0 20px", rotate: "1deg" },
    { bg: "#e4d1b9", borderRadius: "30px", rotate: "-1deg" },
    { bg: "#d8c3a5", borderRadius: "0 30px 30px 0", rotate: "2deg" },
    { bg: "#c2a083", borderRadius: "full", rotate: "-3deg" }
  ];

  return (
    <Box className="shared-bg" minH="calc(100vh - 120px)" px={[4, 6, 10]} py={[10, 16, 20]}>
      <Text
        fontSize={["lg", "2xl", "3xl", "4xl"]}
        fontWeight="bold"
        color="#f3e9dc"
        fontFamily="'Playfair Display', serif"
        mb={4}
        textAlign="center"
        letterSpacing="wide"
        textShadow="1px 1px #7B5E57"
      >
        ✧ My Personal Verses ✧
      </Text>

      {loading ? (
        <Spinner size="xl" color="#f3e9dc" mt={20} />
      ) : personalQuotes.length === 0 ? (
        <Text fontSize="lg" color="#f3e9dc" textAlign="center" fontStyle="italic" mt={20}>
          You haven’t kept any personal verses yet. Write something and choose not to share it.
        </Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={10} mt={8}>
          {personalQuotes.map((quote, index) => {
            const style = styles[index % styles.length];
            return (
              <Box
                key={quote.id || index}
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
                  {quote.content}
                </Text>
                <Text fontSize="sm" color="#7B5E57" textAlign="center" mb={4}>
                  {new Date(quote.created_at).toLocaleString()}
                </Text>

                <VStack spacing={2}>
                  <Button
                    size="sm"
                    bg="#f3e9dc"
                    color="#5C4033"
                    fontFamily="'Cormorant Garamond', serif"
                    _hover={{ bg: "#e4d1b9" }}
                    onClick={() => handleEdit(quote.id, quote.content)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    bg="#f3e9dc"
                    color="#5C4033"
                    fontFamily="'Cormorant Garamond', serif"
                    _hover={{ bg: "#e4d1b9" }}
                    onClick={() => handleDelete(quote.id)}
                  >
                    Delete
                  </Button>
                </VStack>
              </Box>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default MyPersonalVerses;