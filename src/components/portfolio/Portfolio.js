import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { device } from "../../duck/constants";
import * as Styles from "../common/atoms";
import prokat_active from "../../assets/images/prokat_active.png";
import prokat from "../../assets/images/prokat.png";
import clothes_active from "../../assets/images/clothes_active.png";
import clothes from "../../assets/images/clothes.png";
import memory_active from "../../assets/images/memory_active.png";
import memory from "../../assets/images/memory.png";
import poker_active from "../../assets/images/poker_active.png";
import poker from "../../assets/images/poker.png";
import finance_active from "../../assets/finance_active.png";
import finance from "../../assets/finance.png";
import gametree_active from "../../assets/gametree_active.png";
import gametree from "../../assets/gametree.png";

const cards = [
  {
    icon: finance_active,
    iconActive: finance,
    text: "React, Redux, React-Table, Plotly",
    gridArea: "a",
    type: "dark",
    path: "/portfolio/analytics"
  },
  {
    icon: gametree,
    iconActive: gametree_active,
    text: "React, React Native, GraphQL, MongoDB, NodeJS",
    gridArea: "b",
    path: "/portfolio/gametree"
  },
  {
    icon: prokat,
    iconActive: prokat_active,
    text: "Figma, WordPress, PHP, HTML5, CSS3",
    gridArea: "c",
    type: "dark",
    path: "/portfolio/rent"
  },
  {
    icon: clothes,
    iconActive: clothes_active,
    text: "WordPress, PHP",
    gridArea: "d",
    path: "/portfolio/shop"
  },
  {
    icon: poker,
    iconActive: poker_active,
    text: "React, Redux, Node, Socket.io, MongoDB",
    gridArea: "e",
    type: "dark",
    path: "/portfolio/poker"
  },
  {
    icon: memory,
    iconActive: memory_active,
    text: "React, Redux, JS",
    gridArea: "f",
    path: "/portfolio/memory"
  }
];

const Portfolio = () => {
  return (
    <Styles.Wrapper>
      <Styles.Title>
        <Styles.SectionTitle>
          React & Full-stack JavaScript Developer
        </Styles.SectionTitle>
        <Styles.SectionText>
          Producing high quality responsive websites and exceptional user
          experience
        </Styles.SectionText>
      </Styles.Title>
      <CardsContainer>
        {cards.map((card, index) => (
          <Card
            key={index}
            type={card.type}
            gridArea={card.gridArea}
            to={card.path}
            // target="_blank"
            iconActive={card.iconActive}
          >
            <Styles.CentralPart>
              <Styles.LeftBorder
                color={card.type === "dark" ? "#ffffff" : "#A1A1A1"}
              />
              <CardImage icon={card.icon} />
              <Styles.RightBorder
                color={card.type === "dark" ? "#ffffff" : "#A1A1A1"}
              />
            </Styles.CentralPart>
            <CardText>{card.text}</CardText>
          </Card>
        ))}
      </CardsContainer>
    </Styles.Wrapper>
  );
};

export default Portfolio;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 330px);
  grid-template-areas:
    "a"
    "b"
    "c"
    "d"
    "e"
    "f";
  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 330px);
    grid-template-areas:
      "a b"
      "d c"
      "e f";
  }
  @media ${device.laptop} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 330px);
    grid-template-areas:
      "a b c"
      "d e f";
  }
`;
const CardImage = styled.div`
  width: 185px;
  height: 185px;
  background-image: url(${props => props.icon});
`;
const Card = styled(Link)`
  background-color: ${props => (props.type === "dark" ? "#A1A1A1" : "#D9D9D9")};
  grid-area: ${props => props.gridArea};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #000000;
  text-decoration: none;
  &:hover {
    ${CardImage} {
      background-image: url(${props => props.iconActive});
    }
  }
`;
const CardText = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  margin: 40px auto 0;
  width: 60%;
`;
