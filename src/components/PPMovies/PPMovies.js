import React, { useState, useEffect } from "react";
import { popPlaying } from "../../api";
import Movie from "../Movie/Movie";
import PPPagination from "../PPPagination/PPPagination";

import styles from "./PPMovies.module.css";

const PPMovies = ({ ppcurrentPage, setPpcurrentPage }) => {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const func = async () => {
      const { data } = await popPlaying(ppcurrentPage);

      const { total_pages, results } = data;
      setMovies(results);
      setPages(total_pages);
    };

    func();

    return () => {
      setMovies([]);
      setPages(1);
    };
  }, [ppcurrentPage]);
  return (
    <div>
      {movies.length ? (
        <>
          <div className={styles.container}>
            {movies.map((movie, index) => (
              <Movie key={index} movie={movie} />
            ))}
          </div>
          <PPPagination
            pages={pages}
            setMovies={setMovies}
            setPages={setPages}
            setCurrentPage={setPpcurrentPage}
            currentPage={ppcurrentPage}
          />
        </>
      ) : (
        <div className={styles.container}>loading</div>
      )}
    </div>
  );
};

export default PPMovies;
