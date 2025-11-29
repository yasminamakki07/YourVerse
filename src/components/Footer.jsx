import React from 'react';
import { Box, Text, useBreakpointValue } from '@chakra-ui/react';

function Footer() {
  const fontSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'xl' });
  const paddingY = useBreakpointValue({ base: 3, md: 4, lg: 6 });

  return (
    <Box py={paddingY} textAlign="center" bg="transparent">
      <Box className="soft-wrap">
        <Text
          fontSize={fontSize}
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
