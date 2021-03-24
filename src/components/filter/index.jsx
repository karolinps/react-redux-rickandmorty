import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import axios from "axios";
import Select from "react-select";

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 1.3em;
  grid-auto-flow: columns;
  grid-column-gap: 30px;
  grid-template-columns: repeat(auto-fill, 270px);
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 2em 0;
  .input-search,
  button {
    border: none;
    border-radius: 5px;
    padding: 0 10px;
    height: 40px;
    background: white;
    font-size:16px;
  }
  button {
    cursor: pointer;
  }
`;

const optionsStatus = [
  { value: "alive", label: "alive" },
  { value: "dead", label: "dead" },
  { value: "unknown", label: "unknown" },
];
const optionsGender = [
  { value: "female", label: "female" },
  { value: "male", label: "male" },
  { value: "genderless", label: "genderless" },
  { value: "unknown", label: "unknown" },
];
function Filter() {
  const [inputValue, setInputValue] = useState("");
  const [valueStatus, setValueStatus] = useState("");
  const [valueGender, setValueGender] = useState("");
  const [notFound, setNotFound] = useState("");
  const selectStatusRef = useRef();
  const selectGenderRef = useRef();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputValue(e.target.value);
    dispatch({
      type: "FILTER_BY_NAME",
      payload: e.target.value,
    });
    if (e.target.value.length > 3) {
      search(e.target.value, valueStatus, valueGender);
    }
    if (e.target.value.length === 0) {
      setNotFound("");
    }
  };
  const handleChangeSelect = (e) => {
    if (e !== null) {
      setValueStatus(e.value);
      dispatch({
        type: "FILTER_BY_STATUS",
        payload: e.value,
      });
      search(inputValue, e.value, valueGender);
    }
  };
  const handleChangeGender = (e) => {
    if (e !== null) {
      setValueGender(e.value);
      dispatch({
        type: "FILTER_BY_GENDER",
        payload: e.value,
      });

      search(inputValue, valueStatus, e.value);
    }
  };
  const search = async (name, status, gender) => {
    try {
      const resp = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}&gender=${gender}`
      );
      dispatch({
        type: "CHARACTERS_LIST",
        payload: resp.data.results,
      });
    } catch (error) {
      if (error.response.status === 404) {
        setNotFound("No se encontraron resultados...");
      }
    }
  };
  const getLabel = (option) => {
    return option.label;
  };
  const getValue = (option) => {
    return option.value;
  };
  const clear = () => {
    setInputValue("");
    selectStatusRef.current.select.clearValue();
    selectGenderRef.current.select.clearValue();
    search("", "", "");
    setNotFound("");
  };
  return (
    <>
      <Wrapper>
        <input
          placeholder="Search by name"
          onChange={handleChange}
          value={inputValue}
          className="input-search"
        />
        <Select
          options={optionsStatus}
          onChange={handleChangeSelect}
          getOptionLabel={getLabel}
          getOptionValue={getValue}
          placeholder="Select status"
          ref={selectStatusRef}
        />
        <Select
          options={optionsGender}
          onChange={handleChangeGender}
          getOptionLabel={getLabel}
          getOptionValue={getValue}
          placeholder="Select gender"
          ref={selectGenderRef}
        />
        <button onClick={clear}>Clear filters</button>
      </Wrapper>
      {notFound ? <div style={{ textAlign: "center" }}>{notFound}</div> : ""}
    </>
  );
}
export default Filter;
