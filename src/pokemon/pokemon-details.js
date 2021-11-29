import {useState, useEffect } from 'react'
import './pokemon-details.css'
import { Link } from 'react-router-dom';
function PokemonEvolution(props){
    const [pokemonEvolution, setPokemonEvolution] = useState(null);
    useEffect( () => {
        async function fetchPokemonDetails(){
            let species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.match.params.id}`)
            let speciesData = await species.json();
            let response = await fetch(speciesData?.evolution_chain.url)
            let data = await response.json();
            let evoData = data.chain;
            let evoChain = [];
            do {
            let evoDetails = evoData['evolution_details'][0];
            evoChain.push({
                "species_name": evoData.species.name,
                "min_level": !evoDetails ? 1 : evoDetails.min_level,
                "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
            });
            evoData = evoData['evolves_to'][0];
            } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
            setPokemonEvolution(evoChain);
        }
        fetchPokemonDetails();
        },[])
    return (
        <>
            <h1 className="title"> Pokemon Evolution</h1>
            <h3>This species evolves to :</h3>
            {
                pokemonEvolution && pokemonEvolution.map((data)=> {
                    return <span className="evolve-list"> {data.species_name} </span>
                })
            }
            <div className="list-of-pokemon">
                <Link to="/">List Of Pokemon</Link>
            </div>
        </>
    )
}
export default PokemonEvolution;