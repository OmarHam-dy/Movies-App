import axios from "axios";
import { API_KEY, BASE_URL, IMAGES_BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// static endpoints
const trendingMoviesEndpoint = "trending/movie/day";
const upcomingMoviesEndpoint = "movie/upcoming";
const topRatedMoviesEndpoint = "movie/top_rated";

// dynamic endpoints
const movieDetailsEndpoint = (id) => `movie/${id}`;
const similarMoviesEndpoint = (id) => `movie/${id}/similar`;
const searchMoviesEndpoint = (query) => `search/movie?query=${query}`;

const movieCreditsEndpoint = (id) => `movie/${id}/credits`;
const personDetailsEndpoint = (id) => `person/${id}`;
const personMoviesEndpoint = (id) => `person/${id}/movie_credits`;

export const imageOriginal = (path) =>
  path ? `https://image.tmdb.org/t/p/w200/${path}` : null;
export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w200/${path}` : null;
export const image200 = (path) =>
  path ? `https://image.tmdb.org/t/p/w200/${path}` : null;

async function apiCall(endpoint, errorMessage) {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (err) {
    console.log(err.message);
    throw new Error(errorMessage);
  }
}

export async function fetchTrendingMovies() {
  return await apiCall(
    trendingMoviesEndpoint,
    "Error at fetching trending movies"
  );
}
export async function fetchUpcomingMovies() {
  return await apiCall(
    upcomingMoviesEndpoint,
    "Error at fetching upcoming movies"
  );
}
export async function fetchTopRatedMovies() {
  return await apiCall(
    topRatedMoviesEndpoint,
    "Error at fetching top rated movies"
  );
}
export async function fetchMovieDetails(id) {
  return await apiCall(
    movieDetailsEndpoint(id),
    "Error at fetching movie details"
  );
}
export async function fetchSimilarMovies(id) {
  return await apiCall(
    similarMoviesEndpoint(id),
    "Error at fetching similar movies"
  );
}
export async function fetchMovieCredits(id) {
  return await apiCall(
    movieCreditsEndpoint(id),
    "Error at fetching movies detials"
  );
}
export async function fetchPersonDetails(id) {
  return await apiCall(
    personDetailsEndpoint(id),
    "Error at fetching person detials"
  );
}
export async function fetchPersonMovies(id) {
  return await apiCall(
    personMoviesEndpoint(id),
    "Error at fetching person movies"
  );
}
export async function fetchSearchMovies(query) {
  return await apiCall(
    searchMoviesEndpoint(query),
    "Error at fetching search movies"
  );
}
