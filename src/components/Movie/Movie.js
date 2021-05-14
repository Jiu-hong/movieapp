import React, { useState } from "react";
import { Link } from "react-router-dom";

import { imgBaseUrl } from "../../config";
import {
  Star1,
  Star2,
  Star3,
  Star4,
  Star5,
  Star6,
  Star7,
  Star8,
  Star9,
  Star10,
} from "../Stars";

import styles from "./Movie.module.css";

const Movie = ({ movie }) => {
  const [show, setShow] = useState(false);
  const rate = () => {
    switch (true) {
      case movie.vote_average < 1.5:
        return <Star1 />;
      case movie.vote_average < 2.5:
        return <Star2 />;
      case movie.vote_average < 3.5:
        return <Star3 />;
      case movie.vote_average < 4.5:
        return <Star4 />;
      case movie.vote_average < 5.5:
        return <Star5 />;
      case movie.vote_average < 6.5:
        return <Star6 />;
      case movie.vote_average < 7.5:
        return <Star7 />;
      case movie.vote_average < 8.5:
        return <Star8 />;
      case movie.vote_average < 9.5:
        return <Star9 />;
      case movie.vote_average <= 10:
        return <Star10 />;
      default:
        return null;
    }
  };

  const handleHover = () => {
    setShow(true);
  };

  const handleLeave = () => {
    setShow(false);
  };
  return (
    <div
      className={styles.container}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <Link to={`/detail/${movie.id}`}>
        {movie.poster_path ? (
          <img
            src={`${imgBaseUrl}/w300${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <img src="../img/wallflower.jpg" alt={movie.title} />
        )}
      </Link>
      <Link to={`/detail/${movie.id}`}>
        <div className={styles.word}>{movie.title}</div>
      </Link>

      <div className={styles.rate}>
        {rate()} {movie.vote_average}
      </div>
      <Link to={`/detail/${movie.id}`}>
        <div className={show ? styles.card : styles.hidden}>
          <div className={styles.cardtitle}>
            <strong> {movie.title}</strong>
          </div>
          <div className={styles.cardrelease}>
            Release: {movie.release_date}
          </div>

          <div className={styles.cardrate}>
            {rate()} {movie.vote_average}
          </div>
          <div className={styles.cardvotecount}>
            vote count: {movie.vote_count}
          </div>
          <div className={styles.cardpopularity}>
            popularity: {movie.popularity}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Movie;
