import { createContext } from "react";

export interface MovieContextInterface {
  query: string;
  movies: any[];
  setMovies: React.Dispatch<React.SetStateAction<any[]>>;
}

const MovieContext = createContext<MovieContextInterface | null>(null);

export default MovieContext;
