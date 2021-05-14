import React, { useState, useEffect } from "react";
import { topPlaying } from "../../api";
import Movie from "../Movie/Movie";
import TOPPagination from "../TOPPagination/TOPPagination";

import styles from "./TOPMovies.module.css";

const TOPMovies = ({ topcurrentPage, setTopcurrentPage }) => {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const func = async () => {
      const { data } = await topPlaying(topcurrentPage);

      const { total_pages, results } = data;
      setMovies(results);
      setPages(total_pages);
    };

    func();

    return () => {
      setMovies([]);
      setPages(1);
    };
  }, [topcurrentPage]);
  return (
    <div>
      {movies.length ? (
        <>
          <div className={styles.container}>
            {movies.map((movie, index) => (
              <Movie key={index} movie={movie} />
            ))}
          </div>
          <TOPPagination
            pages={pages}
            setMovies={setMovies}
            setPages={setPages}
            setCurrentPage={setTopcurrentPage}
            currentPage={topcurrentPage}
          />
        </>
      ) : (
        <div className={styles.container}>loading</div>
      )}
    </div>
  );
};

export default TOPMovies;
