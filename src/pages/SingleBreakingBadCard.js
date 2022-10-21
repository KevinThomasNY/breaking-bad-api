import React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SingleBreakingBadCard = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const { breakingBadId } = useParams();

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`https://www.breakingbadapi.com/api/characters/${breakingBadId}`)
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
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="loading"></div>;
  } else {
    return (
      <Box>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Item>
            <h1>{items[0].name}</h1>
            <img height="500px" src={items[0].img} alt="character-icon" />
            <h5>Birthday: {items[0].birthday}</h5>
            <h5>Occupation: {items[0].occupation.join(", ")}</h5>
            <h5>Nickname: {items[0].nickname}</h5>
            <h5>Status: {items[0].status}</h5>
            <h4>Actor: {items[0].portrayed}</h4>
            <Link to={`/`}>
              <button className="btn">Back</button>
            </Link>
          </Item>
        </Grid>
      </Box>
    );
  }
};

export default SingleBreakingBadCard;
