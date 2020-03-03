import React, { useState } from "react";
import styled, { css } from "styled-components";

import { Navbar } from "./index";
import { device } from '../../duck/constants';

const BurgerMenu = () => {
  const [opened, setOpened] = useState(false);
  const toggleOpened = () => setOpened(!opened);
  return (
    <Wrapper>
      <BurgerIcon onClick={toggleOpened} opened={opened}>
        <span />
        <span />
        <span />
        <span />
      </BurgerIcon>
      <Navbar type="burger" opened={opened}/>
    </Wrapper>
  );
};

export default BurgerMenu;

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10;
  right: 0;
  overflow: hidden;
  width: 250px;
  height: 350px;
  align-items: flex-end;
  @media ${device.laptop} {
    display: none;
  }
`;
const BurgerIcon = styled.div`
  width: 60px;
  height: 45px;
  position: relative;
  margin: 25px;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: pointer;
  z-index: 3;
  & > span {
    display: block;
    position: absolute;
    height: 5px;
    width: 100%;
    background: #000;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }
  & > span:nth-child(1) {
    top: 0px;
    ${props => {
      if (props.opened)
        return css`
          top: 18px;
          width: 0%;
          left: 50%;
        `;
    }}
  }
  & > span:nth-child(2) {
    top: 18px;
    ${props => {
      if (props.opened)
        return css`
          transform: rotate(45deg);
        `;
    }}
  }
  & > span:nth-child(3) {
    top: 18px;
    ${props => {
      if (props.opened)
        return css`
          transform: rotate(-45deg);
        `;
    }}
  }
  & > span:nth-child(4) {
    top: 36px;
    ${props => {
      if (props.opened)
        return css`
          top: 18px;
          width: 0%;
          left: 50%;
        `;
    }}
  }
`;
