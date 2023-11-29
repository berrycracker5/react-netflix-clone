import React, { useEffect, useState } from "react";
import "./Banner.css";
import TMDB_REQEUST from "../api/request";
import axiosInstance from "../api/axios";

function Banner() {
  const [movie, setMovie] = useState<any>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져온다.
    const request = await axiosInstance.get(TMDB_REQEUST.fetchNowPlaying);
    console.log(request.data?.results);

    // 여러 영화 중 랜덤으로 하나를 선택한다.
    const randomMovieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    // 선택한 Id를 가진 영화 정보를 가져온다.
    const result = await axiosInstance.get(`movie/${randomMovieId}`, {
      params: {
        append_to_response: "videos",
      },
    });
    console.log(result.data);
    setMovie(result.data);
  };

  // 일정 글자수 이상에서 ...으로 표시
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundImage:
          movie?.backdrop_path &&
          `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button play">Play</button>
          <button className="banner__button info">More Infomation</button>
        </div>

        <h1 className="banner__description">
          {truncate(movie?.overview, 100)}
        </h1>
      </div>

      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
