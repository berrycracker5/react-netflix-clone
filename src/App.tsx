import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Row from "./components/Row";
import TMDB_REQEUST from "./api/request";

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        id="NO"
        fetchUrl={TMDB_REQEUST.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" id="TN" fetchUrl={TMDB_REQEUST.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={TMDB_REQEUST.fetchTopRated} />
      <Row
        title="Action Movies"
        id="AM"
        fetchUrl={TMDB_REQEUST.fetchActionMovies}
      />
      <Row
        title="Comedy Movies"
        id="CM"
        fetchUrl={TMDB_REQEUST.fetchComedyMovies}
      />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
