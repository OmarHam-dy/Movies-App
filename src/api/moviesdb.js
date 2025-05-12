import axios from "axios";
import { API_KEY, BASE_URL, IMAGES_BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

const endpoints = {
  trending: "trending/movie/day",
  upcoming: "movie/upcoming",
  topRated: "movie/top_rated",
};

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
  return await apiCall(endpoints.trending, "Error at fetching trending movies");
}
export async function fetchUpcomingMovies() {
  return await apiCall(endpoints.upcoming, "Error at fetching upcoming movies");
}
export async function fetchTopRatedMovies() {
  return await apiCall(
    endpoints.topRated,
    "Error at fetching top rated movies"
  );
}
export async function fetchMovieDetails(id) {
  return await apiCall(`movie/${id}`, "Error at fetching movie details");
}
export async function fetchSimilarMovies(id) {
  return await apiCall(
    `movie/${id}/similar`,
    "Error at fetching similar movies"
  );
}
export async function fetchMovieCredits(id) {
  return await apiCall(
    `movie/${id}/credits`,
    "Error at fetching movies detials"
  );
}
export async function fetchPersonDetails(id) {
  return await apiCall(`person/${id}`, "Error at fetching person detials");
}
export async function fetchPersonMovies(id) {
  return await apiCall(
    `person/${id}/movie_credits`,
    "Error at fetching person movies"
  );
}
export async function fetchSearchMovies(query) {
  return await apiCall(
    `search/movie?query=${query}`,
    "Error at fetching search movies"
  );
}
