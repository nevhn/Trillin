import React, { createContext } from "react";

export interface MovieContextInterface {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  // searchPageNum: number;
  // setSearchPageNum: React.Dispatch<React.SetStateAction<number>>;
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
  isResultsEmpty: boolean;
  setIsResultsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
}

const MovieContext = createContext<MovieContextInterface | null>(null);

export default MovieContext;
