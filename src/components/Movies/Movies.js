import React, { useState, useEffect } from "react";
import { fetchNowPlaying } from "../../api";
import Movie from "../Movie/Movie";
import Pagination from "../Pagination/Pagination";

import styles from "./Movies.module.css";

const Movies = ({ currentPage, setCurrentPage }) => {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const func = async () => {
      const { data } = await fetchNowPlaying(currentPage);

      const { total_pages, results } = data;
      setMovies(results);
      setPages(total_pages);
    };

    func();

    return () => {
      setMovies([]);
      setPages(1);
    };
  }, [currentPage]);

  return (
    <div>
      {movies.length ? (
        <>
          <div className={styles.container}>
            {movies.map((movie, index) => (
              <Movie key={index} movie={movie} />
            ))}
          </div>
          <Pagination
            pages={pages}
            setMovies={setMovies}
            setPages={setPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      ) : (
        <div className={styles.container}>loading</div>
      )}
    </div>
  );
};

export default Movies;
