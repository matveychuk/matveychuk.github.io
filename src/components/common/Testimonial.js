import React from "react";
import styled from "styled-components";

import { device } from "../../duck/constants";
import * as Styles from "../common/atoms";

const Testimonial = ({ text, author, company, bgColor }) => {
  return (
    <ItemWrapper bgColor={bgColor}>
      <InnerWrapper>
        <Styles.CentralPart>
          <Styles.LeftBorder color="#A1A1A1" />
          <Text>{text}</Text>
          <Styles.RightBorder color="#A1A1A1" />
        </Styles.CentralPart>
        <Author>{author}</Author>
        <Company>{company}</Company>
      </InnerWrapper>
    </ItemWrapper>
  );
};

export default Testimonial;
const ItemWrapper = styled.div`
  background-color: ${props => props.bgColor};
  padding: 30px;
  font-size: 18px;
  line-height: 20px;
  @media ${device.laptop} {
    font-size: 22px;
    line-height: 32px;
  }
`;
const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const Text = styled.p`
  font-weight: 700;
  padding: 0 30px;
  text-align: center;
  width: 85%;
`;
const Author = styled.span`
  font-weight: normal;
  margin-top: 30px;
`;
const Company = styled.span`
  text-transform: uppercase;
`;
