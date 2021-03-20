import React from "react";
import styled from "styled-components";

const CardStyled = styled.div`
  cursor: pointer;
  text-align: left;
  border-radius: 5px;

  img {
    width: 100%;
    object-fit: cover;
    vertical-align: top;
    border-radius: 5px 5px 0 0;
  }
  .card-body {
    padding: 1.5em;
    border: 1px solid transparent;
    background: rgb(232, 229, 53);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    height: 150px;
  }
  h1 {
    margin: 0;
    margin-bottom: 1rem;
    font-size: 18px;
    font-weight: 700;
  }
  p {
    font-size: 1em;
    margin-bottom: 0.5rem;
  }
`;

function Card({ image, name, gender, species, location }) {
  return (
    <CardStyled>
      <img loading="lazy" src={image} alt={name} />
      <div className="card-body">
        <h1>{name}</h1>
        <p>
          <strong>Genero:</strong> {gender}
        </p>
        <p>
          <strong>Especie:</strong> {species}
        </p>
        <p>
          <strong>Localización:</strong> {location.name}
        </p>
      </div>
    </CardStyled>
  );
}

export default Card;
