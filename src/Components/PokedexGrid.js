import React, { useState } from "react";
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  CardMedia,
  Typography,
} from "@mui/material";
import "./PokedexGrid.css";
import mockData from "../mockData";
import { Link } from "react-router-dom";

const PokedexGrid = () => {
  const [pokemonData, setPokemonData] = useState(mockData);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getPokemonCard = (pokemonId) => {
    console.log(pokemonData[`${pokemonId}`]);
    const { id, name } = pokemonData[`${pokemonId}`];
    const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;

    return (
      <Grid item xs={12} sm={4} key={pokemonId}>
        <Link className="link" to={`/${pokemonId}`}>
          <Card>
            <CardMedia className="cardMedia" image={sprite} />
            <CardContent className="cardContent">
              <Typography>{`${id}. ${capitalizeFirstLetter(name)}`}</Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    );
  };

  return (
    <>
      {pokemonData ? (
        <Grid container spacing={2} className="pokedexContainer">
          {Object.keys(pokemonData).map((pokemonId) =>
            getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default PokedexGrid;
