import React from "react";
import styled from "styled-components";

import { device } from "../../duck/constants";
import * as Styles from "../common/atoms";
import name_image from "../../assets/images/name_image.png";
import avatar from "../../assets/images/avatar.jpg";
import bg_bio_ornament from "../../assets/images/bg_bio_ornament.jpg";
import fe_logos from "../../assets/images/fe_logos.png";
import be_logo from "../../assets/images/be_logo.png";
import design_logos from "../../assets/images/design_logos.png";
import ifrs from "../../assets/ifrs.svg";

const skills = [
  {
    title: "Front-end skills",
    text:
      "I am specialised in React and Redux. Also have a commercial experience in GraphQL and Apollo store. Rather than create websites on a page-by-page basis, I instead consider each element of your screen-based designs as separate components that can exist elsewhere on a website; outside of the context of your design compositions.\n\nBy working using progressive enhancement, your website is delivered with a responsive layout that can best make use of the space available on the smallest to largest devices. I prefer Mobile First strategy that means designing for mobile before designing for desktop or any other device (This will make the page display faster on smaller devices).\n\nCross browser compatibility is ensured by using feature detection so older browsers still in use today provide a solid experience, whilst modern browsers can go the next step and enhance a user’s time spent on your site.\n\nWriting semantic markup that is documented and easy to read means it can be maintained and scaled in the future, and allows co-workers to quickly work with it.\n\nMy front-end build process involves the use of different libraries such as Styled Components, React-Table, Plotly and so on to speed up development.",
    image: fe_logos
  },
  {
    title: "Finance skills",
    text:
      "*Applicable for developing finance related apps.\n\nMore than 10 years experience in international accounting, reporting and finance on managing position let me deeply understand tasks related with this area, explain them other team members and provide clients with high quality service.",
    image: ifrs
  },
  {
    title: "Back-end skills",
    text:
      "Knowledge in the back-end field allows me to provide a full-stack service or to maximally fruitfully cooperate with the part of the team responsible for the back-end.\n\nI have an experience of web application development with MERN stack (MongoDb, ExpressJS, React and NodeJs).\n\nAlso, I am have good professional skills in integration of user-facing elements with server side logic and design and implementation of data storage solutions.\n\nMy back-end build process involves the use of tools such as Sockets.io, Mongoose, Passport for NodeJs to speed up development.For small projects as a team lead I can create an architecture of project, choose a set of tools, delegate a tasks and deploy the application.",
    image: be_logo
  },
  {
    title: "Design skills",
    text:
      "I convert designs to high-performance code whilst respecting your designer’s compositions. I consider design to be just as important as development and aim to combine both to produce high quality user experience.\n\nI have a solid experience with Adobe Photoshop. My preferred design application for creating mockups and wireframes is Figma.",
    image: design_logos
  }
];
const About = () => {
  return (
    <Styles.Wrapper>
      <Styles.Title>
        <NameWithBorders src={name_image} alt="Sasha Matveychuk name" />
        <Styles.SectionTitle>React JavaScript Developer</Styles.SectionTitle>
        {/* <Styles.SectionText>
          Producing high quality responsive websites and exceptional user
          experience
        </Styles.SectionText> */}
      </Styles.Title>
      <BioSection>
        <Styles.CentralPart>
          <Styles.LeftBorder color="#a1a1a1" />
          <Avatar src={avatar} alt="my avatar" />

          <Styles.RightBorder color="#a1a1a1" />
        </Styles.CentralPart>
        <Description>
          A unique combination of programming and finance skills allow my
          clients to develop financial applications many times faster
        </Description>
      </BioSection>
      <SkillsContainer>
        {skills.map((skill, index) => (
          <Skill key={index}>
            <SkillHeader>
              <Styles.CentralPart>
                <Styles.LeftBorder color="#ffffff" />
                <SkillTitle>{skill.title}</SkillTitle>
                <Styles.RightBorder color="#ffffff" />
              </Styles.CentralPart>
            </SkillHeader>
            <InnerWrapper>
              <SkillImage src={skill.image} alt="tools logos" />
              <SkillText>{skill.text}</SkillText>
            </InnerWrapper>
          </Skill>
        ))}
      </SkillsContainer>
    </Styles.Wrapper>
  );
};

export default About;

const NameWithBorders = styled.img`
  max-width: 100%;
  @media ${device.tablet} {
    max-width: 70%;
    margin-top: 20px;
  }
`;
const BioSection = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
  @media ${device.tablet} {
    flex-direction: row;
  }
`;
const Avatar = styled.img`
  padding: 20px;
`;
const Description = styled.p`
  font-size: 20px;
  line-height: 24px;
  margin: 20px 30px;
  text-align: center;
  @media ${device.laptop} {
    font-size: 30px;
    line-height: 35px;
  }
`;
const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Skill = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d9d9d9;
`;
const SkillHeader = styled.div`
  background-image: url(${bg_bio_ornament});
  background-size: 50%;
  background-repeat: repeat;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${device.laptop} {
    height: 110px;
  }
`;
const SkillTitle = styled.h3`
  font-size: 30px;
  line-height: 35px;
  font-weight: 400;
  margin: 10px;
  @media ${device.laptop} {
    font-size: 48px;
    line-height: 75px;
    margin: 0 10px;
  }
`;
const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SkillImage = styled.img`
  margin: 10px;
  @media ${device.laptop} {
    margin: 30px 0 10px;
  }
`;
const SkillText = styled.p`
  font-size: 16px;
  line-height: 20px;
  white-space: pre-wrap;
  padding: 0 20px;
  text-align: justify;
  @media ${device.laptop} {
    font-size: 24px;
    line-height: 32px;
  }
`;
