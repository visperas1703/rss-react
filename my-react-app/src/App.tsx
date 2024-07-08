import { Component } from 'react';
import Search from './search';
import PokemonList from './PokemonList';
import axios from 'axios';
import Loader from './loader';
import { Pokemon, PokemonResponse } from './types';
import './index.css';

interface AppState {
  pokemons: Pokemon[];
  searchTerm: string;
  loading: boolean;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    const searchTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      pokemons: [],
      searchTerm,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchPokemons(this.state.searchTerm);
  }

  fetchPokemons = async (searchTerm: string) => {
    this.setState({ loading: true });
    try {
      const response = await axios.get<PokemonResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`,
      );
      const filteredPokemons = response.data.results.filter(
        (pokemon: Pokemon) => pokemon.name.includes(searchTerm.toLowerCase()),
      );
      this.setState({ pokemons: filteredPokemons, loading: false });
    } catch (error) {
      console.error('Error fetching pokemons:', error);
      this.setState({ loading: false });
    }
  };

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
    localStorage.setItem('searchTerm', searchTerm);
    this.fetchPokemons(searchTerm);
  };

  render() {
    const { pokemons, loading } = this.state;

    return (
      <div>
        <Search onSearch={this.handleSearch} />
        {loading ? <Loader /> : <PokemonList pokemons={pokemons} />}
      </div>
    );
  }
}

export default App;
