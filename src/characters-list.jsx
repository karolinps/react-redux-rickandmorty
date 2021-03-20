import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "./components/card/index";
import { useSelector, useDispatch } from "react-redux";

const CharactersListStyled = styled.div`
  display: grid;
  grid-row-gap: 2.3em;
  grid-auto-flow: columns;
  grid-column-gap: 66px;
  grid-template-columns: repeat(auto-fill, 270px);
  justify-content: center;
  padding: 3em 0;
`;
function CharactersList() {
  const dispatch = useDispatch();
  const charactersList = useSelector((state) => state.charactersList);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((res) => {
        dispatch({
          type: "CHARACTERS_LIST",
          payload: res.data.results,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <CharactersListStyled>
      {charactersList.map(({ name, image, species, gender, location }) => {
        return (
          <Card
            name={name}
            image={image}
            species={species}
            gender={gender}
            location={location}
          />
        );
      })}
    </CharactersListStyled>
  );
}
export default CharactersList;
