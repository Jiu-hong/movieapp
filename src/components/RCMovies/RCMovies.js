import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { recPlaying } from "../../api";
import Movie from "../Movie/Movie";

import styles from "./RCMovies.module.css";

const RCMovies = ({ rccurrentPage }) => {
  const { movieid } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const func = async () => {
      const { data } = await recPlaying(movieid, rccurrentPage);

      const { results } = data;
      setMovies(results);
    };

    func();

    return () => {
      setMovies([]);
    };
  }, [movieid, rccurrentPage]);
  return (
    <div>
      {movies.length ? (
        <div className={styles.container}>
          {movies.map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className={styles.container}>loading</div>
      )}
    </div>
  );
};

export default RCMovies;
