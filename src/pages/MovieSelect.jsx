import { getMovieTMDB } from "../services/api";
import { Box, Container } from "@material-ui/core";
import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import MovieSelected from "../components/MovieSelected";

function MovieSelect() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  let styles = {
    paperContainer: {
      background: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}") no-repeat bottom center scroll`,
    },
  };

  useEffect(() => {
    getMovieTMDB(id, setMovie);
  }, [id]);

  return (
    <main>
      <Box
        sx={{
          pt: 3,
          pb: 6,
        }}
        style={styles.paperContainer}
      >
        <Container
          sx={{ py: 8 }}
          maxWidth={false}
         
        >
          <MovieSelected movie={movie} />
        </Container>
      </Box>
    </main>
  );
}

export default MovieSelect;
