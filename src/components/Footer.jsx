import React from "react";
import styled from "styled-components";

const MainCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ca7a39;
  position: absolute;
  bottom: -60px;
  width: 90vw;
  height: 10vh;
  border-radius: 20px;
  & >h3 a{
    color:black;
    transition: all 250ms ease;
    &:hover{
        color:#161de4
    }
  }
  @media (max-width: 768px) {
    &>h3{
        font-size: 1rem;
    }
  }  /* color: white; */
`;
export const Footer = () => {
  return (
    <MainCont>
      <Container>
        <h3>Made by 👽 <a href="https://rudransh.netlify.app/">Rudransh Aggarwal</a></h3>
      </Container>
    </MainCont>
  );
};
