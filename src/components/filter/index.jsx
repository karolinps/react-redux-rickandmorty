import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function Filter() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputValue(e.target.value);
    dispatch({
      type: "FILTER_BY_NAME",
      payload: e.target.value,
    });
    if (inputValue.length > 2) {
      search(inputValue);
    } else {
      search();
    }
  };
  const search = async () => {
    const resp = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${inputValue}`
    );
    dispatch({
      type: "CHARACTERS_LIST",
      payload: resp.data.results,
    });
  };
  return (
    <Wrapper>
      <input placeholder="name" onChange={handleChange} value={inputValue} />
    </Wrapper>
  );
}
export default Filter;
