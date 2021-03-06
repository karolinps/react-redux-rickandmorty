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
  grid-column-gap: 30px;
  grid-template-columns: repeat(auto-fill, 270px);
  justify-content: center;
  padding: 2em 0;
`;
function CharactersList() {
  const dispatch = useDispatch();
  const charactersList = useSelector((state) => state.charactersList);
  const [pageCount, setPageCount] = useState(0);
  const [current, setPageCurrent] = useState("");

  useEffect(() => {
    getDataList();
    getPagination();
     //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const currentPage = offset ? offset : 1;
    setPageCurrent(currentPage - 1);
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
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
      forcePage={current}
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
        {charactersList.map(
          ({ name, image, species, gender, location, status }, i) => {
            return (
              <Card
                name={name}
                image={image}
                species={species}
                gender={gender}
                location={location}
                status={status}
                key={i}
              />
            );
          }
        )}
      </CharactersListStyled>
      {paginate}
    </>
  );
}
export default CharactersList;
