import React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Search from "./Search";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BreakingBadCard = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  //Handle search bar
  const [query, setQuery] = useState("");
  const queryFunction = (q) => {
    setQuery(q);
  };
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(
      `https://www.breakingbadapi.com/api/characters?limit=57&offset=0&name=${query}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [query]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="loading"></div>;
  } else {
    return (
      <Box sx={{ width: "100%" }}>
        <Search getQuery={queryFunction} />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
        >
          {items.map((item) => (
            <Grid item xs={2} sm={4} md={4} key={item.char_id}>
              <Item>
                <h5>{item.name}</h5>
                <img width="100%" height="400px" src={item.img} />
                <Link to={`/${item.char_id}`}>
                  <button className="btn">More Info</button>
                </Link>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
};

export default BreakingBadCard;
