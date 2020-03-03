import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { device } from "../../duck/constants";
import email from "../../assets/email.svg";
import skype from "../../assets/skype.svg";
import phone from "../../assets/phone.svg";
import * as Styles from "../common/atoms";
const contacts = [
  { icon: email, text: "matveychuk.a@gmail.com" },
  { icon: skype, text: "matveychuk.a" },
  { icon: phone, text: "+38 (050) 351 82 99" }
];


const Contacts = () => {
  return (
    <Styles.Wrapper>
      <Styles.Title>
        <Styles.SectionTitle>Contacts</Styles.SectionTitle>
        <Styles.SectionText>Enquire about hiring Sasha</Styles.SectionText>
      </Styles.Title>
      <DescriptionContainer>
        <DescriptionText>
          Please contact me to enquire about hiring me. To learn about how I
          work and the value I can bring to your project, please visit{" "}
          <DescriptionLink to="/about">
            About
          </DescriptionLink>{" "}
          or to see what I’ve produced for other clients, view my{" "}
          <DescriptionLink to="/portfolio">
            Portfolio
          </DescriptionLink>{" "}
        </DescriptionText>
      </DescriptionContainer>
      <ContactSectionContainer>
        <ContactSection>
          <ContactTitle>Contact me:</ContactTitle>
          <IconsWrapper>
            {contacts.map((contact, index) => (
              <ContactType key={index}>
                <ContactIcon src={contact.icon} alt="contact icon" />
                <ContactText>{contact.text}</ContactText>
              </ContactType>
            ))}
          </IconsWrapper>
        </ContactSection>
      </ContactSectionContainer>
    </Styles.Wrapper>
  );
};

export default Contacts;

const DescriptionContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;
const DescriptionText = styled.p`
  font-size: 24px;
  line-height: 28px;
  padding: 50px;
  text-align: center;
`;
const DescriptionLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
`;
const ContactSectionContainer = styled.div`
  background-color: #e5e5e5;
  padding: 30px;
`;
const ContactSection = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;
const ContactTitle = styled.h2`
  font-weight: 700;
  font-size: 48px;
  line-height: 56px;
  text-align: center;
`;
const IconsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${device.laptop} {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const ContactType = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ContactIcon = styled.img`
  margin: 30px;
`;
const ContactText = styled.span`
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;
`;
