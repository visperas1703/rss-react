import React from 'react';

interface PokemonListProps {
  pokemons: any[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  return (
    <div>
      {pokemons.map((pokemon, index) => (
        <div key={index}>{pokemon.name}</div>
      ))}
    </div>
  );
};

export default PokemonList;
