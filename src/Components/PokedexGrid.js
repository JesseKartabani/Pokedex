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

function PokedexGrid() {
  const [filter, setFilter] = useState("");
  const [pokemonData, setPokemonData] = useState({});

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSearchChange = (e) => {
    setFilter(e.target.value.toLowerCase());
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

  // Indivdual pokemon cards
  const MakePokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];

    return (
      <Grid item xs={12} sm={4} key={pokemonId}>
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
    <div className="pokedexBackground">
      {/* Search bar */}
      <AppBar position="fixed">
        <Toolbar className="toolBar">
          <div className="searchContainer">
            <img
              className="pokemonLogo"
              src={require("../assets/pokedexLogo.png")}
              alt="Logo"
            />

            <SearchIcon className="searchIcon" fontSize="large" />
            <TextField
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white", fontSize: "20px" },
              }}
              onChange={handleSearchChange}
              className="searchInput"
              label="Search"
              variant="standard"
            />
          </div>
        </Toolbar>
      </AppBar>

      <div className="spacer"></div>

      {pokemonData ? (
        // Call make pokemon card for every pokemon id we have
        <Grid container spacing={2} className="pokedexContainer">
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              // If we have search input only render pokemon matching the search
              pokemonData[pokemonId].name.includes(filter) &&
              MakePokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        // Loading circle if we dont have pokemon data
        <div className="circularProgress">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default PokedexGrid;
