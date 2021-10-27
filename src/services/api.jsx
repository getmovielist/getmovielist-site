import axios from "axios";

export const apiTMDB = axios.create({
  baseURL: "https://api.themoviedb.org/",
  params: {
    api_key: process.env.REACT_APP_TOKEN_API,
    language: navigator.language,
  },
});

export const getMovieTMDB = async(id, setMovie) => { 
  const response = await apiTMDB.get(`3/movie/${id}`);
  setMovie(response.data);
}
export const getWatchProviders = async(id, setWatchProviders) => { 
  const response = await apiTMDB.get(`3/movie/${id}/watch/providers`);
  setWatchProviders(response.data);
}
