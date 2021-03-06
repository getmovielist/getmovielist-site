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
  getTvTMDB,
  getWatchProvidersTv,
  getCredits,
  getImages,
  getVideos,
  getEpisodes,
} from "../services/api";
import WatchProviders from "../components/WatchProviders";
import ContainerCredits from "../components/ContainerCredits";
import { BackToTop } from "material-ui-back-to-top";
import MovieSearch from "./MovieSearch";
import ContainerImages from "../components/ContainerImages";

import { useLocation } from "react-router-dom";
import ContainerVideos from "../components/ContainerVideos";
import ContainerEpisodes from "../components/ContainerEpisodes";

function CardProviders({ watchProviders }) {
  if (watchProviders === null) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Watch Providers
          </Typography>
          NULL
        </CardContent>
      </Card>
    );
  }
  if (watchProviders === undefined) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Watch Providers
          </Typography>
          Undefined
        </CardContent>
      </Card>
    );
  }
  if (Object.keys(watchProviders.results).length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Watch Providers
          </Typography>
          Empty
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Watch Providers
        </Typography>
        <WatchProviders providers={watchProviders} />
      </CardContent>
    </Card>
  );
}

export default function TVSelected(props) {
  const [search, setSearch] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  const [movie, setTv] = useState({});
  const [watchProviders, setWatchProviders] = useState(null);
  const [credits, setCredits] = useState({});
  const [images, setImages] = useState({});
  const [videos, setVideos] = useState({});
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    setSearch(false);
  }, [location]);

  useEffect(() => {
    setTv({});
    getTvTMDB(id, setTv);
    getWatchProvidersTv(id, setWatchProviders);
    getCredits(id, setCredits, "tv");
    getImages(id, setImages, "tv");
    getVideos(id, setVideos, "tv");
  }, [id, search]);

  let styles = {
    paperContainer: {
      backgroundColor: "#2b2b2b",
    },
  };
  if (movie === null || movie === undefined) {
    return (
      <>
        <MovieSearch
          type="tv"
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
          type="tv"
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
      },
    };
  }
  for (var i = 0; i < movie.seasons.length; i++) {
    getEpisodes(id, episodes, setEpisodes, i);
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
                      {movie.name} ({movie.original_name})
                    </Typography>

                    <Typography sx={{ mb: 1.5 }}>
                      {movie.first_air_date === "" ? (
                        "???"
                      ) : (
                        <FormattedDate
                          value={
                            new Date(`${movie.first_air_date}T03:00:00.000Z`)
                          }
                        />
                      )}
                      {movie.last_air_date === "" ? (
                        "-"
                      ) : (
                        <>
                          ,
                          <FormattedDate
                            value={
                              new Date(`${movie.last_air_date}T03:00:00.000Z`)
                            }
                          />
                        </>
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
                </Card>
                <br />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={4}>
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <CardProviders watchProviders={watchProviders} />
                    {/* <Card>
                      <CardContent>
                        {movie.seasons.map((season, index2) => {
                          return (
                            <React.Fragment key={index2}>
                              {index2 + 1} - {season.name}
                              {episodes[index2] !== undefined
                                ? episodes[index2].episodes.map(
                                    (episode, index3) => {
                                      return (
                                        
                                        <React.Fragment key={index3}>
                                          <br/>
                                          <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${episode.still_path}`} alt="teste" width="80"/>
                                          {episode.name}<br/>
                                          
                                        </React.Fragment>
                                      );
                                    }
                                  )
                                : ""}
                            </React.Fragment>
                          );
                        })}
                      </CardContent>
                    </Card> */}
                  </Grid>
                  <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                    <ContainerImages images={images} />
                    <ContainerEpisodes episodes={episodes} />
                    <ContainerVideos videos={videos} />
                  </Grid>

                  {Object.keys(credits).length === 0 ? (
                    ""
                  ) : (
                    <ContainerCredits credits={credits} />
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
