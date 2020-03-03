import React from "react";
import styled from "styled-components";

import logo from "../../assets/images/logo.svg";
import { BurgerMenu, Navbar } from "../common";
import { device } from "../../duck/constants";

const navbarItems = ["about", "portfolio", "testimonials", "contacts"];

const Header = () => {
  return (
    <Wrapper>
      <Logo src={logo} alt="logo" />
      <BurgerMenu item={navbarItems} />
      <NavContainer>
        <Navbar type="header" />
      </NavContainer>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const Logo = styled.img`
  width: 100px;
  @media ${device.laptop} {
    width: 150px;
  }
`;
const NavContainer = styled.nav`
  display: none;
  @media ${device.laptop} {
    display: block;
  }
`;
