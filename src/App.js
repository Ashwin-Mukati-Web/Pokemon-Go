import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Pokemon from './pokemon/pokemon'
import PokemonEvolution from './pokemon/pokemon-details'
function App() {
  return (
    <Switch>
      <Router>
      <div>
        <Route exact path="/" component={Pokemon}>
        </Route>
        <Route path="/evolve/:id"  component={PokemonEvolution}>
        </Route>
      </div>
    </Router>
  </Switch>
  );
}
export default App;
