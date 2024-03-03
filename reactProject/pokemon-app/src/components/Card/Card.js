import React from "react";
import "./Card.css";

const Card = ({ pokemon, i }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="pokemon" />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardTypes">
        {pokemon.types.map((type, i) => {
          return (
            <div key={i} className="cardType">
              <span className="typeName">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <div className="cardDataTitle">
            <p>重さ: {pokemon.weight}</p>
          </div>
          <div className="cardDataTitle"></div>
          <p>高さ: {pokemon.height}</p>
        </div>
        <div className="cardDataTitle">
          <p>アビリティーズ: {pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
