import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./PokemonStats.css";
import { CircularProgress } from "@mui/material";

function PokemonStats() {
  const [pokemonData, setpokemonData] = useState([]);

  // id of page we are on
  const params = useParams();

  // get pokemon stats using page id
  const fetchPokemonData = async () => {
    const response =
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}
    `);
    const pokemon = response.data;
    console.log(pokemon);
    setpokemonData(pokemon);
  };

  const capitalizeFirstLetter = (string) => {
    if (string === undefined) return;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  return (
    <>
      {pokemonData.name === undefined && (
        <div className="circularProgress">
          <CircularProgress />
        </div>
      )}

      {pokemonData.name && (
        <div className="container">
          <h1 className="pokemonName">
            {capitalizeFirstLetter(pokemonData.name)}
          </h1>

          <img
            className="pokemonImage"
            src={pokemonData.sprites.front_default}
            alt="Pokemon"
          />

          <h2 className="infoHeading">Info</h2>

          <div className="pokemonInfo">
            <div>
              Species: {capitalizeFirstLetter(pokemonData.species.name)}
            </div>

            <div>Height: {pokemonData.height}</div>
            <div>Weight: {pokemonData.weight}</div>
            <br />

            <div>Types:</div>
            <div>{capitalizeFirstLetter(pokemonData.types[0]?.type.name)}</div>
            <div>{capitalizeFirstLetter(pokemonData.types[1]?.type.name)}</div>
          </div>
        </div>
      )}

      <div className="container">
        <Link className="pokedexLink" to={"/"}>
          BACK TO POKEDEX
        </Link>
      </div>
    </>
  );
}

export default PokemonStats;
