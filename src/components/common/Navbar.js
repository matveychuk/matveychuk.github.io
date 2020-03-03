import React from "react";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

const navbarItems = ["about", "portfolio", "testimonials", "contacts"];
const activeStyle = {
  borderBottom: "3px solid",
  borderRadius: "3px"
};

const Navbar = ({ type, opened }) => {
  return (
    <NavList type={type} opened={opened}>
      {navbarItems.map((item, index) => (
        <li key={index}>
          <NavItem
            activeStyle={type === "header" ? activeStyle : {}}
            type={type}
            to={`/${item}`}
          >
            {item}
          </NavItem>
          {index !== navbarItems.length - 1 && type === "header" && (
            <BulletPoint></BulletPoint>
          )}
        </li>
      ))}
    </NavList>
  );
};

export default Navbar;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-out;
  ${props => {
    switch (props.type) {
      case "header":
        return css`
          flex-direction: row;
        `;
      case "footer":
        return css`
          width: 150px;
        `;
      case "burger":
        if (!props.opened)
          return css`
            width: 250px;
            position: absolute;
            top: -35px;
            right: -240px;
            padding: 110px 0 30px;
          `;
        if (props.opened)
          return css`
            width: 250px;
            position: absolute;
            top: -35px;
            right: 0px;
            background-color: #d9d9d9;
            padding: 110px 0 30px;
          `;

        return css``;
      default:
        return;
    }
  }}
  list-style: none;
  & > li {
    display: flex;
    align-items: center;
  }
`;
const NavItem = styled(NavLink)`
  font-size: 24px;
  line-height: ${props => (props.type === "burger" ? "48px" : "28px")};
  color: #000;
  padding: 0 10px;
  cursor: pointer;
  color: #000000;
  text-decoration: none;
  &:hover {
    font-weight: 700;
    text-decoration: underline;
  }
  ${props => {
    switch (props.type) {
      case "header":
        return css`
          font-weight: 700;
          margin: 20px;
          padding: 0;
          &:hover {
            color: grey;
            text-decoration: none;
          }
        `;
      case "footer":
        return css`
          padding: 10px 0;
        `;
      default:
        return;
    }
  }}
`;
const BulletPoint = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: #000;
`;
