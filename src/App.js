import React from "react";
import { Route, Routes } from "react-router-dom";
import PokedexPage from "./pages/PokedexPage";
import PokemonStatsPage from "./pages/PokemonStatsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PokedexPage />} />

      <Route path="/:pokemonId" element={<PokemonStatsPage />} />
    </Routes>
  );
}

export default App;
