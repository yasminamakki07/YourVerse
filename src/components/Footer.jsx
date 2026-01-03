import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function Footer() {
  return (
    <Box 
      py={{ base: 3, md: 4, lg: 6 }} 
      textAlign="center" 
      bg="transparent"
    >
      <Box className="soft-wrap">
        <Text
          fontSize={{ base: 'sm', md: 'md', lg: 'xl' }}
          fontWeight="bold"
          color="#5C4033"
          fontFamily="'Playfair Display', serif"
        >
          © 2025 Your Verse – All rights reserved.
        </Text>
      </Box>
    </Box>
  );
}

export default Footer;
