import { IOmdbResponse } from "../../../src/ts/models/IOmdbResponse";

export const mockData: IOmdbResponse = {
  Search: [
    {
      Title: "The Lion King",
      imdbID: "tt0110357",
      Type: "movie",
      Poster: "https://imageofthelionking.jpg",
      Year: "1994",
    },
    {
      Title: "The Lion King",
      imdbID: "tt0110357",
      Type: "movie",
      Poster: "https://imageofthelionking.jpg",
      Year: "1994",
    },
    {
      Title: "The Lion King 2: Simba's Pride",
      imdbID: "tt0110358",
      Type: "movie",
      Poster: "https://imageofthelionking2.jpg",
      Year: "1998",
    },
    {
      Title: "The Lion King 3: Hakuna Matata",
      imdbID: "tt0110359",
      Type: "movie",
      Poster: "https://imageofthelionking3.jpg",
      Year: "2004",
    },
  ],
};

export const noMockData: IOmdbResponse = {
  Search: [],
};
