import { useState, useEffect } from 'react'
import './pokemon.css'
import { Link } from 'react-router-dom';
function Pokemon() {
    const [pokemon, setPokemon] = useState();
    const [pokemonProperties, setPokemonProperties] = useState([])
    useEffect(() => {
        async function fetchPokemon() {
            let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
            let data = await response.json();
            let url = data.results.map(indPok => indPok.url);
            let results = await Promise.all(url.map(async (item) => {
                let result = await fetch(item);
                let data = await result.json()
                return data;
            }));
            setPokemon(data.results);
            setPokemonProperties(results);
        }
        fetchPokemon();
    }, [])
    return (
        <div className="pokemon">
            <h1 className="title">Pokemon</h1>
            <div className="list-pokemon">
                {
                    pokemon && pokemonProperties.length > 0 &&
                    pokemon.map((individualPokemon, i) => {
                        const { name } = individualPokemon;
                        return (
                            <Link to={`/evolve/${pokemonProperties[i].id}`} class="card">
                                <div key={i}>
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonProperties[i].id}.png`} alt={name}
                                        className="pokemon-image" alt="Avatar" />
                                    <div class="container">
                                        <div className="container">
                                            <h1>{name}</h1>
                                            <h3>Moves</h3>
                                            <span>{pokemonProperties[i]?.moves[0]?.move.name}</span>
                                            <span>{pokemonProperties[i]?.moves[1]?.move.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Pokemon;
