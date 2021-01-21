import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";
  
// interface에서 movie 타입을 object로 설정하고 적용
type MovieChild = {
  movie: {
    Poster: string;
    Title: string;
    Year: string;
  }
}
const Movie = ( {movie}: MovieChild ) => {
  // typeof movie >> object
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <div className="movie">
      <h2>{movie.Title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <p>{movie.Year}</p>
    </div>
  );
}
export default Movie;