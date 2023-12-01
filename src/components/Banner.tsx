import React, { useEffect, useState } from "react";
import "./Banner.css";
import TMDB_REQEUST from "../api/request";
import axiosInstance from "../api/axios";
import styled from "styled-components";

function Banner() {
  const [movie, setMovie] = useState<any>([]);
  const [isClicked, setIsClicked] = useState<boolean>(false);

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

  if (!isClicked) {
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
            <button
              className="banner__button play"
              onClick={() => {
                setIsClicked(true);
              }}
            >
              Play
            </button>
            <button className="banner__button info">More Infomation</button>
          </div>

          <h1 className="banner__description">
            {truncate(movie?.overview, 100)}
          </h1>
        </div>

        <div className="banner--fadeBottom"></div>
      </header>
    );
  } else {
    return (
      <>
        <Container>
          <HomeContainer>
            <IFrame
              src={`https://www.youtube.com/embed/${movie?.videos?.results?.[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie?.videos?.results?.[0]?.key}}`}
              width="640"
              height="360"
              allow="autoplay; fullscreen;"
            ></IFrame>
          </HomeContainer>
        </Container>
      </>
    );
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const IFrame = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default Banner;
