import React from "react";

import * as Styles from "../common/atoms";
import { Testimonial } from "../common";
const testimonials = [
  {
    text:
      "Sasha is literally one of the best people I have worked with in my life. She is reliable, detail-oriented, and organized. She's also a team player, cares about her work, and always has an enjoyable and pleasant demeanor.",
    author: "John Uke",
    company: "CEO @GameTree"
  },
  {
    text:
      "I have worked with Sasha on two different projects based on WordPress. One of them had unique design created from scratch and the goal was to implement it and add admin panel on back-end. In both cases, the work was done on time, on budget, and with a high degree of professionalism. Across the board, everyone enjoyed working with Sasha. Sasha not only did exceptional work based on the specs we gave her for each project, but she also gave input on how to make the end product even better and cared about how users would engage with the builds. I will be using Sasha again in the future and would highly recommend her services to anyone.",
    author: "Aleksandra Pugach",
    company: "GALLERY DUTUNSTVA"
  }
];

const Testimonials = () => {
  return (
    <Styles.Wrapper>
      <Styles.Title>
        <Styles.SectionTitle>Testimonials</Styles.SectionTitle>
        <Styles.SectionText>
          What clients say about Sasha Matveychuk
        </Styles.SectionText>
      </Styles.Title>
      {testimonials.map((item, index) => (
        <Testimonial
          key={index}
          text={item.text}
          author={item.author}
          company={item.company}
          bgColor={index % 2 !== 0 ? "#E5E5E5" : "white"}
        />
      ))}
    </Styles.Wrapper>
  );
};

export default Testimonials;

