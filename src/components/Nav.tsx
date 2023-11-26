import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, setShow] = useState<boolean>(true); // navigation show 상태면 배경이 검정색 (클래스)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(false);
      } else {
        setShow(true);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  });

  return (
    <>
      <nav className={`nav ${show ? "nav__black" : ""}`}>
        <img
          className="nav__logo"
          alt="Netflix Logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/400px-Netflix_2015_logo.svg.png"
          onClick={() => window.location.reload()}
        />

        <img
          className="nav__avatar"
          alt="User logged"
          src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
        />
      </nav>
    </>
  );
}

export default Nav;
