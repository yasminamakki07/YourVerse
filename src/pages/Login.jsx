import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Image,
  useBreakpointValue
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import extra from "../assets/extra.jpg";
import writing from "../assets/writing.jpg";
import wish from "../assets/wish.jpg";
import child from "../assets/child.jpg";
import sky from "../assets/sky.jpg";
import captain from "../assets/captain.jpg";
import API_BASE_URL from "../config";
<<<<<<< HEAD
=======

>>>>>>> 36406b922b7d313f5c7694fffc1bbfdfb6ef83ab

const MotionBox = motion(Box);
const MotionText = motion(Text);

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [useEmailLogin, setUseEmailLogin] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (isLogin) {
      if (useEmailLogin) {
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Enter a valid email";
        }
      } else {
        if (!formData.username) newErrors.username = "Username is required";
      }
    } else {
      if (!formData.username) newErrors.username = "Username is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Enter a valid email";
      }
    }
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      let response;
<<<<<<< HEAD
=======
     
     if (isLogin) {
  response = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      useEmailLogin
        ? { email: formData.email, password: formData.password }
        : { username: formData.username, password: formData.password }
    )
  });
} else {
  response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: formData.username,
      email: formData.email,
      password: formData.password
    })
  });
}
 else {
  response = await fetch("https://yourverse-backend.onrender.com/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: formData.username,
      email: formData.email,
      password: formData.password
    })
  });
}
>>>>>>> 36406b922b7d313f5c7694fffc1bbfdfb6ef83ab

      if (isLogin) {
        // Login request
        response = await fetch(`${API_BASE_URL}/api/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            useEmailLogin
              ? { email: formData.email, password: formData.password }
              : { username: formData.username, password: formData.password }
          )
        });
      } else {
        // Register request
        response = await fetch(`${API_BASE_URL}/api/users/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password
          })
        });
      }

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        if (data.user && data.user.id) {
          localStorage.setItem("currentUserId", data.user.id);
        }

        setSubmittedData(formData);
        setTimeout(() => setSubmittedData(null), 5000);

        toast({
          title: isLogin ? "Welcome back 🌙" : "Account created ✨",
          description: isLogin
            ? "You are now logged in."
            : data.message || "Your account has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true
        });

        setFormData({ username: "", email: "", password: "" });
        setErrors({});

        navigate("/write");   // ✅ Redirect to Write page
      } else {
        toast({
          title: "Error",
          description: data.message || "Something went wrong",
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

  const boxPadding = useBreakpointValue({ base: 4, md: 6, lg: 8 });
  const boxMaxWidth = useBreakpointValue({ base: "90%", sm: "80%", md: "400px" });
  const imageSize = useBreakpointValue({ base: "100px", sm: "140px", md: "180px", lg: "200px" });
  const stackSpacing = useBreakpointValue({ base: 3, md: 4 });

  return (
    <Box
      className="shared-bg"
      minH="calc(100vh - 120px)"
      px={[4, 6, 10]}
      py={[6, 10, 16]}
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
      flexDirection="column"
    >
      {/* Floating popup */}
      <AnimatePresence>
        {submittedData && (
          <MotionBox
            position="absolute"
            top="20px"
            left="50%"
            transform="translateX(-50%)"
            bg="#f3e9dc"
            color="#5C4033"
            px={6}
            py={4}
            borderRadius="md"
            boxShadow="lg"
            fontFamily="'Cormorant Garamond', serif"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            zIndex={10}
          >
            <Text fontSize="sm">
              <strong>{isLogin ? "Logged in with:" : "Signed up with:"}</strong><br />
              {submittedData.username && <>Username: {submittedData.username}<br /></>}
              {submittedData.email && <>Email: {submittedData.email}<br /></>}
            </Text>
          </MotionBox>
        )}
      </AnimatePresence>

      <MotionBox
        bg="#f3e9dc"
        p={boxPadding}
        borderRadius="xl"
        boxShadow="xl"
        maxW={boxMaxWidth}
        w="100%"
        fontFamily="'Cormorant Garamond', serif"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <MotionText
          fontSize="2xl"
          fontWeight="bold"
          color="#5C4033"
          textAlign="center"
          mb={4}
        >
          {isLogin ? "Welcome back , Dreamer" : "Begin your verse"}
        </MotionText>

        <VStack spacing={stackSpacing}>
          {(!useEmailLogin || !isLogin) && (
            <FormControl isInvalid={errors.username}>
              <FormLabel color="#5C4033">Username</FormLabel>
              <Input
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                bg="#fffaf3"
                color="#5C4033"
              />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>
          )}

          {(useEmailLogin || !isLogin) && (
            <FormControl isInvalid={errors.email}>
              <FormLabel color="#5C4033">Email</FormLabel>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                bg="#fffaf3"
                color="#5C4033"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
          )}

          <FormControl isInvalid={errors.password}>
            <FormLabel color="#5C4033">Password</FormLabel>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              bg="#fffaf3"
              color="#5C4033"
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          {isLogin && (
            <Text
              fontSize="sm"
              color="#7B5E57"
              textAlign="right"
              cursor="pointer"
              onClick={() => setUseEmailLogin(!useEmailLogin)}
            >
              {useEmailLogin ? "Login with username?" : "Login with email?"}
            </Text>
          )}

          <Button
            onClick={handleSubmit}
            bg="#a47148"
            color="#f3e9dc"
            w="100%"
            _hover={{ bg: "#c2a083", transform: "scale(1.03)" }}
          >
                       {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </VStack>

        <HStack justify="center" mt={4}>
          <Text fontSize="sm" color="#7B5E57">
            {isLogin ? "New here?" : "Already have an account?"}
          </Text>
          <Button
            variant="link"
            color="#a47148"
            onClick={() => {
              setIsLogin(!isLogin);
              setSubmittedData(null);
              setErrors({});
              setUseEmailLogin(false);
            }}
          >
            {isLogin ? "Sign up" : "Log in"}
          </Button>
        </HStack>
      </MotionBox>

      {/* Images below the login/signup box */}
      <HStack spacing={[4, 6, 8]} mt={10} justify="center" wrap="nowrap" overflowX="auto">
        {(isLogin ? [extra, writing, wish] : [child, sky, captain]).map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`img-${idx}`}
            boxSize={imageSize}
            objectFit="cover"
            filter="drop-shadow(0 0 6px  #a47148)" 
            flexShrink={0}
          />
        ))}
      </HStack>
    </Box>
  );
}

export default Login;
