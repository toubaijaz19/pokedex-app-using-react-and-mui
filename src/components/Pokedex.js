import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Grid, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PokemonCard from "./PokemonCard";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
    containerPadding: {
        paddingTop: '30px',
        paddingRight: '11%',
        paddingLeft: '11%',
    },
    appbarStyling: {
      marginLeft: '11%',
      paddingLeft: 0,
    }, 
});

const Pokedex = (props) => {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const setInputVal= (e) => {
    // prevent.Default();
    setInput(e.target.value);
  };
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar className={classes.appbarStyling}>
          <SearchIcon />
          <TextField
            id="filled-basic"
            label="Search Pokemon"
            variant="filled"
            style={{ marginLeft: "5px" }}
            onChange = {setInputVal}
          />
        </Toolbar>
      </AppBar>
      <Grid container spacing={8} className={classes.containerPadding}>
        <PokemonCard {...props} input={input} />
      </Grid>
    </React.Fragment>
  );
};
export default Pokedex;