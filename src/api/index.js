import axios from "axios";
import { AccessToken } from "../config";

export const host = "https://api.themoviedb.org/3/movie";

export const API = axios.create({ baseURL: host });

API.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${AccessToken}`;
  // req.headers.Content-Type = "application/json;charset=utf-8";

  return req;
});

// get details
// https://api.themoviedb.org/3/movie/{movie_id}
export const fetchDetail = (movieid) => API.get(host + `/${movieid}`);

// get movie images
// https://developers.themoviedb.org/3/movies/get-movie-images
// https://api.themoviedb.org/3/movie/{movie_id}/images
export const fetchImages = (movieid) => API.get(host + `/${movieid}/images`);

// get recommandations
// https://developers.themoviedb.org/3/movies/get-movie-recommendations
// https://api.themoviedb.org/3/movie/{movie_id}/recommendations
// https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1
export const recPlaying = (movieid, pagenum) =>
  API.get(host + `/${movieid}/recommendations?page=${pagenum}`);

// GET /movie/now_playing
// https://developers.themoviedb.org/3/movies/get-now-playing
// https://api.themoviedb.org/3/movie/now_playing
export const fetchNowPlaying = (pagenum) =>
  API.get(host + `/now_playing?page=${pagenum}`);

// GET/movie/popular
// https://developers.themoviedb.org/3/movies/get-popular-movies
// https://api.themoviedb.org/3/movie/popular
export const popPlaying = (pagenum) =>
  API.get(host + `/popular?page=${pagenum}`);

// GET/movie/upcoming
// https://developers.themoviedb.org/3/movies/get-upcoming
// https://api.themoviedb.org/3/movie/upcoming
export const upComingPlaying = (pagenum) =>
  API.get(host + `/upcoming?page=${pagenum}`);

// Get Top Rated
// https://developers.themoviedb.org/3/movies/get-top-rated-movies
// https://api.themoviedb.org/3/movie/top_rated?page=1
export const topPlaying = (pagenum) =>
  API.get(host + `/top_rated?page=${pagenum}`);
