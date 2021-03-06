import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  Container,
} from "@material-ui/core";

import { FormattedDate } from "react-intl";
import { useParams } from "react-router";
import {
  getMovieTMDB,
  getWatchProviders,
  getCredits,
  getImages,
  getVideos,
  getCollection,
  getMoviePopCorn,
} from "../services/api";
import WatchProviders from "../components/WatchProviders";
import ContainerCredits from "../components/ContainerCredits";
import { BackToTop } from "material-ui-back-to-top";
import MovieSearch from "./MovieSearch";
import ContainerImages from "../components/ContainerImages";
import { useLocation } from "react-router-dom";
import ContainerVideos from "../components/ContainerVideos";
import ContainerCollection from "../components/ContainerCollection";
import ContainerTorrents from "../components/ContainerTorrents";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

function CardProviders({ watchProviders }) {
  if (watchProviders === null) {
    return (
      <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Watch Providers
            </Typography>
            NULL
          </CardContent>
        </Card>
      </Grid>
    );
  }
  if (watchProviders === undefined) {
    return (
      <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Watch Providers
            </Typography>
            Undefined
          </CardContent>
        </Card>
      </Grid>
    );
  }
  if (Object.keys(watchProviders.results).length === 0) {
    return (
      <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Watch Providers
            </Typography>
            Empty
          </CardContent>
        </Card>
      </Grid>
    );
  }
  return (
    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Watch Providers
          </Typography>
          <WatchProviders providers={watchProviders} />
        </CardContent>
      </Card>
    </Grid>
  );
}

export default function MovieSelected(props) {
  const [search, setSearch] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [watchProviders, setWatchProviders] = useState(null);
  const [credits, setCredits] = useState({});
  const [images, setImages] = useState({});
  const [videos, setVideos] = useState({});
  const [moviePopcorn, setMoviePopcorn] = useState(null);
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    setSearch(false);
  }, [location]);

  useEffect(() => {
    if (
      movie.belongs_to_collection !== null &&
      movie.belongs_to_collection !== undefined
    ) {
      if (movie.belongs_to_collection.id !== undefined) {
        getCollection(movie.belongs_to_collection.id, setCollection);
      }
    }
    if (movie.imdb_id !== null && movie.imdb_id !== undefined) {
      getMoviePopCorn(movie.imdb_id, setMoviePopcorn);
    }
  }, [movie]);

  useEffect(() => {
    setMovie({});
    getMovieTMDB(id, setMovie);
    getWatchProviders(id, setWatchProviders);
    getCredits(id, setCredits);
    getImages(id, setImages);
    getVideos(id, setVideos);
  }, [id, search]);

  let styles = {
    paperContainer: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };
  if (movie === null || movie === undefined) {
    return (
      <>
        <MovieSearch
          type="movie"
          noSearchJustHeader={true}
          setSearch={setSearch}
          searching={search}
        />
        Loading...
      </>
    );
  }
  if (Object.keys(movie).length === 0) {
    return (
      <>
        <MovieSearch
          type="movie"
          noSearchJustHeader={true}
          setSearch={setSearch}
          searching={search}
        />
        Loading...
      </>
    );
  }

  if (movie.backdrop_path !== null && movie.backdrop_path !== undefined) {
    styles = {
      paperContainer: {
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}") `,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      },
    };
  }

  if (search) {
    return (
      <MovieSearch
        noSearchJustHeader={true}
        setSearch={setSearch}
        searching={search}
      />
    );
  }
  return (
    <>
      {console.log(moviePopcorn)}
      <MovieSearch
        noSearchJustHeader={true}
        setSearch={setSearch}
        searching={search}
      />

      <main>
        <BackToTop />

        <Box
          sx={{
            pt: 25,
            pb: 6,
          }}
          style={styles.paperContainer}
        >
          <Container sx={{ py: 8 }} maxWidth={false}>
            <Grid container spacing={4}>
              <Grid item xl={1} lg={2} md={2} sm={5} xs={5}>
                <Card>
                  <CardMedia
                    component="img"
                    image={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                    alt="green iguana"
                  />
                </Card>
              </Grid>

              <Grid item xl={11} lg={10} md={10} sm={7} xs={7}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {movie.title} ({movie.original_title})
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                      {movie.release_date === "" ? (
                        "???"
                      ) : (
                        <FormattedDate
                          value={
                            new Date(`${movie.release_date}T03:00:00.000Z`)
                          }
                        />
                      )}

                      <br />
                      {movie.genres.map((genere, index) => {
                        return (
                          <React.Fragment key={index}>
                            {genere.name}/
                          </React.Fragment>
                        );
                      })}
                    </Typography>
                    <Typography variant="body2">{movie.overview}</Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Card>
                <br />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={4}>
                  <CardProviders watchProviders={watchProviders} />

                  <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                    <ContainerTorrents movie={moviePopcorn} />
                    <ContainerImages images={images} />
                    <ContainerVideos videos={videos} />
                  </Grid>

                  {Object.keys(credits).length === 0 ? (
                    <>Loading credits</>
                  ) : (
                    <ContainerCredits credits={credits} />
                  )}

                  {collection === null ? (
                    <></>
                  ) : (
                    <ContainerCollection
                      collection={collection}
                      credits={credits}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
    </>
  );
}
