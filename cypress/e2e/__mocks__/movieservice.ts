import { IOmdbResponse } from "../../../src/ts/models/IOmdbResponse";

export const mockData: IOmdbResponse = {
  Search: [
    {
      Title: "The Lion King",
      imdbID: "tt0110357",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg",
      Year: "1994",
    },
    {
      Title: "The Lion King",
      imdbID: "tt0110357",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg",
      Year: "1994",
    },
    {
      Title: "The Lion King 2: Simba's Pride",
      imdbID: "tt0110358",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BY2Y3MTk2MDgtOTc1Yy00ZmFjLThlNTEtMDQ1Y2EzZmRjMzVjXkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_SX300.jpg",
      Year: "1998",
    },
    {
      Title: "The Lion King 3: Hakuna Matata",
      imdbID: "tt0110359",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BOGZiMDQ1YTQtMGVlOC00OTJiLWFkYzMtYjdiYmY0NWM5YzVjXkEyXkFqcGdeQXVyOTg4MDk3MTQ@._V1_SX300.jpg",
      Year: "2004",
    },
  ],
};

export const noMockData: IOmdbResponse = {
  Search: [],
};
