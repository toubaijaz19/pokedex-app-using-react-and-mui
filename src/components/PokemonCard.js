import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import mockData from "./mockData";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
const useStyles = makeStyles({
  cardRadius: {
      borderRadius: '10px',
  },
  textPosition: {
      textAlign: 'center',
      textTransform: 'capitalize',
  }
});
const PokemonCard= (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState({});
  // API Data
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then((res) => {
        console.log(res.data);
        const  { results } = res.data;
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
  // Pokemon Cards 
  const cardData = Object.values(pokemonData).map((pokemonObject) => {
    console.log("pokemon data", pokemonData);
    const { id, name, sprite } = pokemonObject;
    return (
      // condition for search input data
      pokemonData[id].name.includes(props.input) && (
        <Grid item xs={10} sm={6} md={4}>
          <Card
            className={classes.cardRadius}
            onClick={() => history.push(`/${id}`)}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="180"
                width="130"
                image={sprite}
                alt={name}
              />
              <CardContent className={classes.textPosition}>
                <Typography gutterBottom variant="h5" component="div">
                  {`${id}. ${name}`}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      )
    );
  });
  // return card
  return <React.Fragment>{cardData}</React.Fragment>;
};
export default PokemonCard;
