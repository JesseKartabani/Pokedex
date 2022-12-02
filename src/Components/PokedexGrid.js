import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  CardMedia,
  Typography,
} from "@mui/material";
import "./PokedexGrid.css";
import { Link } from "react-router-dom";
import axios from "axios";

function PokedexGrid() {
  const [pokemonData, setPokemonData] = useState({});

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Returns id, name, and sprite for 800 pokemon
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=800")
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  // Indivdual pokemon cards
  const MakePokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];

    return (
      <Grid item xs={12} sm={4} key={pokemonId}>
        <Link className="link" to={`/${pokemonId}`}>
          <Card>
            <CardMedia className="cardMedia" image={sprite} />
            <CardContent className="cardContent">
              <h1 className="cardText">{`${id}. ${capitalizeFirstLetter(
                name
              )}`}</h1>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    );
  };

  return (
    <>
      {pokemonData ? (
        // Call make pokemon card for every pokemon id we have
        <Grid container spacing={2} className="pokedexContainer">
          {Object.keys(pokemonData).map((pokemonId) =>
            MakePokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        // Loading circle if we dont have pokemon data
        <div className="circularProgress">
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export default PokedexGrid;
