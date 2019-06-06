import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Text, Image, Heading } from "gestalt";

const NavBar = () => (
  <Box
    height={70}
    color="midnight"
    padding={1}
    shape="roundedBottom"
    display="flex"
    alignItems="center"
    justifyContent="around"
  >
    {/* Sign In Link */}
    <NavLink to="/signin">
      <Text size="xl" color="white">
        Sign In
      </Text>
    </NavLink>

    {/* Title and Logo */}
    <NavLink to="/">
      <Box display="flex" alignItems="center">
        <Box margin={2} width={50} height={50}>
          <Image
            src="./icons/logo.svg"
            alt="Brew Logo"
            naturalHeight={1}
            naturalWidth={1}
          />
        </Box>
        <Heading size="xs" color="orange">
          Brew
        </Heading>
      </Box>
    </NavLink>

    {/* Sign Up Link */}
    <NavLink to="/signup">
      <Text size="xl" color="white">
        Sign Up
      </Text>
    </NavLink>
  </Box>
);

export default NavBar;
