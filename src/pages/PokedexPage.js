import React from "react";
import PokedexGrid from "../Components/PokedexGrid";
import SearchBar from "../Components/SearchBar";

function PokedexPage() {
  return (
    <>
      <SearchBar />
      <PokedexGrid />
    </>
  );
}

export default PokedexPage;
