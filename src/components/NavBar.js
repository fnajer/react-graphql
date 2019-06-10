import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Text, Image, Heading, Button } from "gestalt";
import { getToken } from "../utils";

const NavBar = () => {
  return getToken() !== null ? <AuthNavBar/> : <UnAuthNavBar/>;
}

const UnAuthNavBar = () => (
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
    <NavLink exact to="/">
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

const AuthNavBar = () => (
  <Box
    height={70}
    color="midnight"
    padding={1}
    shape="roundedBottom"
    display="flex"
    alignItems="center"
    justifyContent="around"
  >
    {/* Checkout Link */}
    <NavLink to="/checkout">
      <Text size="xl" color="white">
        Checkout
      </Text>
    </NavLink>

    {/* Title and Logo */}
    <NavLink exact to="/">
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

    {/* Signout Button */}
    <Button color="transparent" size="md" text="Sign Out" inline/>
  </Box>
);

export default NavBar;
