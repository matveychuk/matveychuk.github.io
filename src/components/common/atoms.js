import styled from "styled-components";

import { device } from "../../duck/constants";
import bg_header from "../../assets/images/bg_header.png";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Title = styled.section`
  background-image: url(${bg_header});
  background-color: #f6c202;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 350px;
  padding-top: 70px;
  @media ${device.laptop} {
    height: 400px;
  }
`;
export const SectionTitle = styled.h1`
  font-weight: bold;
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  @media ${device.laptop} {
    font-size: 48px;
    line-height: 56px;
  }
`;
export const SectionText = styled.h2`
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  max-width: 800px;
  margin: 0;
  @media ${device.laptop} {
    font-size: 30px;
    line-height: 40px;
  }
`;

export const CentralPart = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Border = styled.div`
  width: 20px;
  border: 5px solid #c4c4c4;
`;
export const LeftBorder = styled(Border)`
  border-color: ${props => (props.color ? props.color : "#c4c4c4")};
  border-right: none;
`;
export const RightBorder = styled(Border)`
  border-color: ${props => (props.color ? props.color : "#c4c4c4")};
  border-left: none;
`;
