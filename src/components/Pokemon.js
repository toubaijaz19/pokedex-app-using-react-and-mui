import {
  Link,
  Typography,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
const useStyles = makeStyles({
  containerPadding: {
    paddingLeft: "50px",
    paddingTop: '30px',
  },
});

const Pokemon = (props) => {
  const classes = useStyles();
  console.log(props);
  const { history } = props;
  const { pokemonid } = props.match.params;
  const [pokemon, setPokemon] = useState(undefined);
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonid}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonid]);
    const pokemonData = (pokemon) => {
      console.log(pokemon);
    const { id, name, sprites, species, height, weight, types } = pokemon;
    return (
      <>
        <Typography variant="h1" style={{ textTransform: "capitalize" }}>
          {`${id}. ${name}`}
          <img src={sprites.front_shiny} />
        </Typography>
        <img width="200" height="200" src={sprites.front_default} />
        <Typography variant="h3">Pokemon Info</Typography>
        <Typography>
          Species: <Link href={species.url}>{species.name}</Link>{" "}
        </Typography>
        <Typography>Height: {height}</Typography>
        <Typography>Weight: {weight}</Typography>
        <Typography variant="h6">Types:</Typography>
        {types.map((typeInfo) => {
          const { name } = typeInfo.type;
          return <Typography key={name}> {`${name}`}</Typography>;
        })}
      </>
    );
    }
  return (
    <React.Fragment>
      <Paper
        className={classes.containerPadding}
        elevation={0}
        style={{ backgroundColor: "rgb(182, 204, 223)" }}
      >
        {`This is Pokemon #${pokemonid} Page !`}
        {pokemon === undefined && <CircularProgress />}
        {pokemon !== undefined && pokemon && pokemonData(pokemon)}
        {pokemon === false && <Typography> Pokemon not found</Typography>}

        {pokemon !== undefined && (
          <Button variant="contained" onClick={() => history.push("/")}>
            back to pokedex
          </Button>
        )}
      </Paper>
    </React.Fragment>
  );
};
export default Pokemon;
