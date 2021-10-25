import { useEffect, useState } from "react";
import axios from "axios";

export default function useMovieSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  
  useEffect(() => {
    setMovies([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    if (query === "") {
      axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/now_playing",
        params: {
          page: pageNumber,
          api_key: process.env.REACT_APP_TOKEN_API,
          language: navigator.language
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          setMovies((prevMovies) => {
            
            return [
              ...new Set([...prevMovies, ...res.data.results.map((b) => b)]),
            ];
          });
          
          setHasMore(res.data.results.length > 0);
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
    } else {
      axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie",
        params: {
          query,
          page: pageNumber,
          api_key: process.env.REACT_APP_TOKEN_API,
          language: navigator.language
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          setMovies((prevMovies) => {
            return [
              ...new Set([...prevMovies, ...res.data.results.map((b) => b)]),
            ];
          });
          
          setHasMore(res.data.results.length > 0);
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
    }

    return () => cancel();
  }, [query, pageNumber]);

  return { loading, error, movies, hasMore };
}
