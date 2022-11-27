import { createContext } from "react";

export interface MovieContextInterface {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  movies: any[];
  setMovies: React.Dispatch<React.SetStateAction<any[]>>;
  emptyInput: boolean;
  setEmptyInput: React.Dispatch<React.SetStateAction<boolean>>;
  favorites: any[];
  setFavorites: React.Dispatch<React.SetStateAction<any[]>>;
  completed: any[];
  setCompleted: React.Dispatch<React.SetStateAction<any[]>>;
  watchLater: any[];
  setWatchLater: React.Dispatch<React.SetStateAction<any[]>>;
}

const MovieContext = createContext<MovieContextInterface | null>(null);

export default MovieContext;
