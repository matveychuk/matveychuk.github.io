import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import analytics from "../../assets/analytics.svg";
import gametree from "../../assets/gametree.svg";
import galereya from "../../assets/galereya.png";
import babyshop from "../../assets/babyshop.png";
import poker from "../../assets/poker.gif";
import memory from "../../assets/memory.gif";
import { device } from "../../duck/constants";
import * as Styles from "../common/atoms";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { Testimonial } from "../common";

const projects = {
  analytics: {
    image: analytics,
    title: "Financial analytic app",
    tools: "React, Redux, Styled-Components, React-Table, Plotly, Quill",
    url: "",
    comment: "",
    description:
      "This project was related to accounting data analysis and building different reports based on that data. Initial data can be imported from standard accounting systems like QuickBooks or downloaded manually. Additional or adjusting entries can be made by user at any place through workflow.\n\nFor building tables and reports React-Table library was used. Server-side sorting and pagination were added via manual settings. Drilldown and multilevel extending rows help user to understand deeply nested data.\n\nDashboards are build with rich text editor Quill and drag-and-drop functionality for graphycs.\n\nDifferent types of charts and pivot tables are build with PlotlyJs library.\n\nDeep knowledge of accounting let me understand the tasks perfectly and help other team members to implement them."
  },
  gametree: {
    image: gametree,
    title: "Social network for gamers",
    tools: "React, React Native, GraphQL, MongoDB, NodeJS",
    url: "https://gametree.me/",
    comment: "",
    description:
      "This app is designed to create a broad functionality for gamers, including news feed, real-time chat, scheduling game sessions, discovering new games, matching friends, phycological tests, levels and achievements.\n\nDeveloped both as mobile app with React Native and website with React. My main responsibility was web development but also I took part in mobile part as team member. Interesting features that were implemented include: \n\n - authorization via such social networks as Facebook, VK, Google\n\n - syncronization with Google Calendar and Contacts\n\n  -desktop notifications via Firebase\n\n - Discourse forum\n\n - demo mode for unauthorized users\n\n - implementation such analytics tools as Amplitude, Facebook Pixel and Google Tag Manager\n\n - AdSense",
    testimonials: {
      text:
        "Sasha is literally one of the best people I have worked with in my life. She is reliable, detail-oriented, and organized. She's also a team player, cares about her work, and always has an enjoyable and pleasant demeanor.",
      author: "John Uke",
      company: "CEO @GameTree"
    }
  },
  rent: {
    image: galereya,
    title: "Carnival Costumes Rent",
    tools: "WordPress, PHP, Figma",
    url: "http://galereya-prokat.com.ua/",
    comment: "",
    description:
      "The goal was to create an attractive and convenient for users website to help rent costumes business to expand through Internet. On one hand this project had a unique design on other hand due to daily necessity to change/add catalog it should have comfortable admin panel. The decision that was proposed by me is to use WordPress CMS to reduce cost and time for implementation of content management. It was successfully done by PHP settings. Due to right semantic structure and SEO-optimization taking into account all ranking factors three months after publishing the site reached the top of Google search in their niche.",
    testimonials: {
      text:
        "I have worked with Sasha on two different projects based on WordPress. One of them had unique design created from scratch and the goal was to implement it and add admin panel on back-end. In both cases, the work was done on time, on budget, and with a high degree of professionalism. Across the board, everyone enjoyed working with Sasha. Sasha not only did exceptional work based on the specs we gave her for each project, but she also gave input on how to make the end product even better and cared about how users would engage with the builds. I will be using Sasha again in the future and would highly recommend her services to anyone.",
      author: "Aleksandra Pugach",
      company: "GALLERY DUTUNSTVA"
    }
  },

  shop: {
    image: babyshop,
    title: "Baby Clothes Shop",
    tools: "WordPress, PHP",
    url: "",
    comment: "",
    description:
      "Gallery Dutunstva is a small business required fully functional WordPress powered site. The goal was to find and customize for their needs suitable theme in short time and in budget.",
    testimonials: {
      text:
        "I have worked with Sasha on two different projects based on WordPress. One of them had unique design created from scratch and the goal was to implement it and add admin panel on back-end. In both cases, the work was done on time, on budget, and with a high degree of professionalism. Across the board, everyone enjoyed working with Sasha. Sasha not only did exceptional work based on the specs we gave her for each project, but she also gave input on how to make the end product even better and cared about how users would engage with the builds. I will be using Sasha again in the future and would highly recommend her services to anyone.",
      author: "Aleksandra Pugach",
      company: "GALLERY DUTUNSTVA"
    }
  },
  poker: {
    image: poker,
    title: "Planning Poker",
    tools: "React, Redux, NodeJS, Socket.io, MongoDB",
    url: "",
    comment: "",
    description:
      "Planning poker, also called Scrum poker, is a consensus-based, gamified technique for estimating, mostly used to estimate effort or relative size of development goals in software development. In planning poker, members of the group make estimates by playing numbered cards face-down to the table, instead of speaking them aloud. The cards are revealed, and the estimates are then discussed. By hiding the figures in this way, the group can avoid the cognitive bias of anchoring, where the first number spoken aloud sets a precedent for subsequent estimates.\n\nIt is a team project where my role was a project architector, team-lead and developer responsible for implementation of real-time voting with sockets, authorization with tokens and adding a new players with link.\n\n Other interesting feature of this project is dividing of owner's role (can manage questions, reset and flip cards) and player's role (can only vote)."
  },
  memory: {
    image: memory,
    title: "Memory Game",
    tools: "React, Redux, JS",
    url: "https://matveychuk.github.io/MemoryGame_React_Redux/",
    comment: "",
    description:
      "This small task was to create simple Memory Game using such technologies as React and Redux. The Redux is used to store data about state of each card (turned on, turned off, matched), time spent and results."
  }
};

const Project = ({ match }) => {
  const [project, setProject] = useState(null);
  useEffect(() => {
    console.log("match.params.project", match.params.project);
    if (match.params.project) {
      setProject(projects[match.params.project]);
    }
  }, [match.params.project]);

  if (!project) return null;
  return (
    <Styles.Wrapper>
      <Styles.Title>
        <Styles.SectionTitle>{project.title}</Styles.SectionTitle>
        <Styles.SectionText>{project.tools}</Styles.SectionText>
      </Styles.Title>

      <InnerWrapper bgColor="#ffffff">
        <Styles.CentralPart>
          <Styles.LeftBorder color="#A1A1A1" />
          <Image src={project.image} alt="project image" />
          <Styles.RightBorder color="#A1A1A1" />
        </Styles.CentralPart>
        <Header>{project.header}</Header>
        {project.url && (
          <LinkToWebsite href={project.url} target="_blank">
            View website
            <StyledArrow color="#000000" />
          </LinkToWebsite>
        )}
      </InnerWrapper>
      <Description>
        <InnerWrapper>
          <p>{project.description}</p>
        </InnerWrapper>
      </Description>
      {project.testimonials && (
        <Testimonial
          text={project.testimonials.text}
          author={project.testimonials.author}
          company={project.testimonials.company}
          bgColor="#E5E5E5"
        />
      )}
    </Styles.Wrapper>
  );
};

export default withRouter(Project);

const Image = styled.img`
  width: 80%;
  margin: 50px;
`;
const Header = styled.h5``;
const LinkToWebsite = styled.a`
  padding: 20px 50px;
  background-color: #ffc700;
  color: #000000;
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #ffd53f;
    text-decoration: underline;
  }
`;
const Description = styled.div`
  background-color: #e5e5e5;
  padding: 30px;
  font-size: 18px;
  line-height: 20px;
  @media ${device.laptop} {
    font-size: 22px;
    line-height: 36px;
  }
  & p {
    white-space: pre-wrap;
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
  padding: 20px 0;
`;
const StyledArrow = styled(Arrow)`
  width: 25px;
  margin-left: 10px;
  .arrow {
    fill: ${props => props.color};
  }
`;

