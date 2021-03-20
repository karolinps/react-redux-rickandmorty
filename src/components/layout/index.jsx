import React from "react";
import style from "styled-components";
import Header from "../header/index";

const Wrapper = style.div`
    max-width: 1312px;
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
