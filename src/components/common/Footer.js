import React from "react";
import styled from "styled-components";

import bg_footer from "../../assets/images/bg_footer.jpg";
import linkedin_logo from "../../assets/images/linkedin-logo.png";
import github_logo from "../../assets/images/github-logo.png";
import { device } from "../../duck/constants";
import { Navbar } from "../common";

const Header = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <SocialMediaSection>
          <Image src={linkedin_logo} alt="linkedin_logo" />
          <SectionHeader>VIEW my</SectionHeader>
          <SectionLink
            href="https://www.linkedin.com/in/sasha-matveychuk-b75b314/"
            target="_blank"
          >
            LinkedIn profile
          </SectionLink>
        </SocialMediaSection>
        <SocialMediaSection>
          <Image src={github_logo} alt="github_logo" />
          <SectionHeader>VIEW my</SectionHeader>
          <SectionLink href="https://github.com/matveychuk" target="_blank">
            GitHub account
          </SectionLink>
        </SocialMediaSection>
        <Navbar type="footer" />
      </InnerWrapper>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  background-image: url(${bg_footer});
  background-repeat: repeat;
`;
const InnerWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${device.laptop} {
    flex-direction: row;
    justify-content: space-evenly;
  }
  align-items: center;
  min-height: 300px;
  padding: 50px 0;
`;
const SocialMediaSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  margin: 25px 0;
  @media ${device.laptop} {
    align-items: flex-start;
  }
`;
const Image = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 15px;
`;
const SectionHeader = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
`;
const SectionLink = styled.a`
  font-family: Raleway;
  font-size: 24px;
  line-height: 28px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    font-weight: 700;
    text-decoration: underline;
  }
`;
