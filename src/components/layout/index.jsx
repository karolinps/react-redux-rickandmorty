import React from "react";
import style from "styled-components";
import Header from "../header/index";
import PropTypes from "prop-types"; 

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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
