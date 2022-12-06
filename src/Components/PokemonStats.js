import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./PokemonStats.css";
import { CircularProgress } from "@mui/material";
import "animate.css";

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
    <div className="pokemonBackground">
      {/* Display loading screen until we have pokemon data */}
      {pokemonData.name === undefined && (
        <CircularProgress className="circularProgress" />
      )}

      {/* Once we have pokemon data display name, img, and info */}
      {pokemonData.name && (
        <div className="container">
          <h1 className="pokemonName animate__animated animate__fadeInDown">
            {capitalizeFirstLetter(pokemonData.name)}
          </h1>

          <img
            className="pokemonImage animate__animated animate__fadeIn"
            src={pokemonData.sprites.front_default}
            alt="Pokemon"
          />

          <h2 className="infoHeading animate__animated animate__fadeInLeft">
            Info
          </h2>

          <div className="pokemonInfo animate__animated animate__fadeInLeft">
            {/* Weight is in hectograms and height is in decimeters */}
            <div>
              <div className="subHeading">Height</div>
              <div>{pokemonData.height / 10}m</div>
              <br />

              <div className="subHeading">Weight</div>
              <div>{pokemonData.weight / 10}kg</div>
              <br />
            </div>

            <div className="types">
              <div className="subHeading">Types</div>
              <div>
                {capitalizeFirstLetter(pokemonData.types[0]?.type.name)}
              </div>
              <div>
                {capitalizeFirstLetter(pokemonData.types[1]?.type.name)}
              </div>
              <br />
            </div>

            <div>
              <div className="subHeading">Stats</div>
              <div>Hp: &emsp;&nbsp;{pokemonData.stats[0].base_stat}</div>
              <div>Atk: &emsp;{pokemonData.stats[1].base_stat}</div>
              <div>Def: &emsp;{pokemonData.stats[2].base_stat}</div>
              <div>S.Atk: &nbsp;{pokemonData.stats[3].base_stat}</div>
              <div>S.Def: &nbsp;{pokemonData.stats[4].base_stat}</div>
              <div>Spd: &emsp;{pokemonData.stats[5].base_stat}</div>
            </div>
          </div>

          {/* Returns to home page */}
          <Link
            className="pokedexLink animate__animated animate__fadeIn"
            to={"/"}
          >
            BACK TO POKEDEX
          </Link>
        </div>
      )}
    </div>
  );
}

export default PokemonStats;
