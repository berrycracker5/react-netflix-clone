import React, { useEffect, useState } from "react";
import "./Row.css";
import axiosInstance from "../api/axios";
import TMDB_REQEUST from "../api/request";

function Row({
  title,
  id,
  fetchUrl,
  isLargeRow,
}: {
  title: string;
  id: string;
  fetchUrl: string;
  isLargeRow?: boolean;
}) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axiosInstance.get(fetchUrl);
    // console.log(request);
    setMovies(request.data.results);
  };

  return (
    <>
      <section className="row">
        <h2>{title}</h2>
        <div className="slider">
          <div className="slider__arrow-left">
            <span className="arrow" onClick={() => {}}>
              {"<"}
            </span>
          </div>

          <div id={id} className="row__posters">
            {movies.map((movie: any) => (
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original${
                  isLargeRow ? movie?.poster_path : movie?.backdrop_path
                }`}
                alt={movie.name}
              />
            ))}
          </div>

          <div className="slider__arrow-right">
            <span className="arrow">{">"}</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Row;
