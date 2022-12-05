import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  CardMedia,
  AppBar,
  Toolbar,
  TextField,
} from "@mui/material";
import "./PokedexGrid.css";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import "animate.css";

function PokedexGrid() {
  const [searchInput, setSearchInput] = useState("");
  const [pokemonData, setPokemonData] = useState({});

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Saves user search input to state
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  // Returns id, name, and sprite for 800 pokemon
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=800")
      .then(function (response) {
        const results = response.data.results;
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

  // Indivdual pokemon card layout
  const MakePokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];

    return (
      <Grid
        className="animate__animated animate__fadeInUp"
        item
        xs={12}
        sm={4}
        key={pokemonId}
      >
        <Link className="link" to={`/${pokemonId}`}>
          <Card className="card">
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
      {/* Banner */}
      <AppBar position="fixed">
        <Toolbar className="toolBar">
          <div className="searchContainer ">
            {/* Logo */}
            <img
              className="pokemonLogo animate__animated animate__fadeInLeft"
              src={require("../assets/pokedexLogo.png")}
              alt="Logo"
            />

            {/* Search bar */}
            <div className="searchContainer animate__animated animate__fadeInRight">
              <SearchIcon className="searchIcon" fontSize="large" />
              <TextField
                InputProps={{
                  style: { color: "white" },
                }}
                InputLabelProps={{
                  style: { color: "white", fontSize: "1.5rem" },
                }}
                onChange={handleSearchChange}
                className="searchInput"
                label="Search"
                variant="filled"
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {/* Display loading screen until we have pokemon data */}
      {pokemonData[1] === undefined && (
        <CircularProgress className="circularProgress" />
      )}

      {/* Once we have pokemon data */}
      {pokemonData && (
        // Call make pokemon card for every pokemon id we have
        <Grid container spacing={2} className="pokedexContainer">
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              // If we have search input only render pokemon matching the search
              pokemonData[pokemonId].name.includes(searchInput) &&
              MakePokemonCard(pokemonId)
          )}
        </Grid>
      )}
    </>
  );
}

export default PokedexGrid;
