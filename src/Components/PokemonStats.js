import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PokemonStats.css";

function PokemonStats() {
  const [pokemonStats, setPokemonStats] = useState([]);

  // id of page we are on
  const params = useParams();

  // get pokemon stats using page id
  const fetchPokemonData = async () => {
    console.log(params.pokemonId);
    const response =
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}
    `);
    const pokemon = response.data;
    setPokemonStats(pokemon);
    console.log(pokemonStats.data);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  return (
    <>
      {pokemonStats.name && (
        <div className="container">
          <h1 className="pokemonName">
            {capitalizeFirstLetter(pokemonStats.name)}
          </h1>

          <img
            className="pokemonImage"
            src={pokemonStats.sprites.front_default}
            alt="Pokemon"
          />

          <h2 className="infoHeading">Info</h2>

          <div className="pokemonInfo">
            <div>
              Species: {capitalizeFirstLetter(pokemonStats.species.name)}
            </div>

            <div>Height: {pokemonStats.height}</div>
            <div>Weight: {pokemonStats.weight}</div>
            <br />

            <div>Types:</div>
            <div>{pokemonStats.types[0].type.name}</div>
            <div>{pokemonStats.types[1].type.name}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonStats;
