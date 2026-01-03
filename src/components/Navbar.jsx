import React from 'react';
import { Box, Flex, Link, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Read', path: '/read' },
  { label: 'Write', path: '/write' },
  { label: 'Your Verse', path: '/yourverse' },
  { label: 'Impact of a Word', path: '/impact' },
  { label: 'About', path: '/about' }
];

function Navbar() {
  const navigate = useNavigate();

  // Check if a token exists in localStorage
  const token = localStorage.getItem("token");
  const isAuthenticated = Boolean(token);

  // Logout clears the token and redirects
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box px={[4, 6, 10]} py={6} boxShadow="sm" bg="transparent">
      <Flex justify="center" wrap="wrap" gap={[4, 6, 8]} rowGap={[2, 4]}>
        {navItems.map(({ label, path }) => (
          <Box className="soft-wrap" key={label}>
            <Link
              as={NavLink}
              to={path}
              fontSize={["md", "lg", "xl"]}
              fontWeight="bold"
              color="#5C4033"
              fontFamily="'Cormorant Garamond', serif"
              px={2}
            >
              {label}
            </Link>
          </Box>
        ))}

        {isAuthenticated ? (
          <Menu>
            <Box className="soft-wrap">
              <MenuButton
                as={Link}
                fontSize={["md", "lg", "xl"]}
                fontWeight="bold"
                color="#5C4033"
                fontFamily="'Cormorant Garamond', serif"
                px={2}
                cursor="pointer"
                _hover={{ textDecoration: "none", color: "#5C4033" }}
              >
                ☰ My Space
              </MenuButton>
            </Box>
            <MenuList bg="#f3e9dc" borderColor="#a47148">
              <MenuItem
                as={NavLink}
                to="/personal"
                fontSize={["md", "lg", "xl"]}
                fontWeight="bold"
                color="#5C4033"
                fontFamily="'Cormorant Garamond', serif"
              >
                My Personal Verses
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                fontSize={["md", "lg", "xl"]}
                fontWeight="bold"
                color="#5C4033"
                fontFamily="'Cormorant Garamond', serif"
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Box className="soft-wrap">
            <Link
              as={NavLink}
              to="/login"
              fontSize={["md", "lg", "xl"]}
              fontWeight="bold"
              color="#5C4033"
              fontFamily="'Cormorant Garamond', serif"
              px={2}
              _hover={{ textDecoration: "none", color: "#5C4033" }}
            >
              Login / Sign-Up
            </Link>
          </Box>
        )}
      </Flex>
    </Box>
  );
}

export default Navbar;
