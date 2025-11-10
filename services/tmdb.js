
import { TMDB_API_KEY } from '../config/config';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';

export const getPopularMovies = async () => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=1`);
    const json = await res.json();
    return json.results || [];
  } catch (e) {
    console.error('TMDB fetch error', e);
    return [];
  }
};

export const getMovieDetails = async (id) => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=es-ES`);
    return await res.json();
  } catch (e) {
    console.error('TMDB details error', e);
    return null;
  }
};
