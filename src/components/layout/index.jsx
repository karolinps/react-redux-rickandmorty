import React from "react";
import style from "styled-components";
import Header from "../header/index";

const Wrapper = style.div`
    margin: auto;
    padding: 0 1rem;
    background:#3d8b84
`;

function Layout({ children }) {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
}

export default Layout;
