import react from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import Pokedex from './components/Pokedex';
import Pokemon from './components/Pokemon';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => {
          return <Pokedex {...props} />;
        }}
      />
      <Route
        exact
        path="/:pokemonid"
        render={(props) => {
          return <Pokemon {...props} />;
        }}
      />
    </Switch>
  );
}

export default withRouter(App);
