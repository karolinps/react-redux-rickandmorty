import React from "react";
import styleComponent from "styled-components";

const HeaderStyled = styleComponent.div` 
    background:white;
    height:60px;
    display:flex;
    img {
        width:60px;
        margin:0 auto
    }
`;

function Header() {
  return (
    <HeaderStyled>
      <img
        src={"https://rickandmortyapi.com/api/character/avatar/19.jpeg"}
        alt={"rickMorty"}
      />
    </HeaderStyled>
  );
}
export default Header;
