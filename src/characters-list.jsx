import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "./components/card/index";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import Filter from "./components/filter/index";

const CharactersListStyled = styled.div`
  display: grid;
  grid-row-gap: 2.3em;
  grid-auto-flow: columns;
  grid-column-gap: 60px;
  grid-template-columns: repeat(auto-fill, 270px);
  justify-content: center;
  padding: 3em 0;
`;
function CharactersList() {
  const dispatch = useDispatch();
  const charactersList = useSelector((state) => state.charactersList);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    getDataList();
    getPagination();
  }, [dispatch]);

  const getDataList = () => {
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
  };
  const getPagination = (offset) => {
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=${offset}`)
      .then((res) => {
        dispatch({
          type: "CHARACTERS_LIST",
          payload: res.data.results,
        });
        setPageCount(res.data.info.pages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePage = (e) => {
    const selectedPage = e.selected + 1;
    getPagination(selectedPage);
  };
  const paginate = (
    <ReactPaginate
      previousLabel={"prev"}
      nextLabel={"next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePage}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
    />
  );
  return (
    <>
      {paginate}
      <Filter />
      <CharactersListStyled>
        {charactersList.map(({ name, image, species, gender, location }, i) => {
          return (
            <Card
              name={name}
              image={image}
              species={species}
              gender={gender}
              location={location}
              key={i}
            />
          );
        })}
      </CharactersListStyled>
      {paginate}
    </>
  );
}
export default CharactersList;
