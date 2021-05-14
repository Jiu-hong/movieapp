import React, { useState, useEffect } from "react";
import { upComingPlaying } from "../../api";
import Movie from "../Movie/Movie";
import UCPagination from "../UCPagination/UCPagination";

import styles from "./UCMovies.module.css";

const UCMovies = ({ uccurrentPage, setUccurrentPage }) => {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const func = async () => {
      const { data } = await upComingPlaying(uccurrentPage);

      const { total_pages, results } = data;
      setMovies(results);
      setPages(total_pages);
    };

    func();

    return () => {
      setMovies([]);
      setPages(1);
    };
  }, [uccurrentPage]);
  return (
    <div>
      {movies.length ? (
        <>
          <div className={styles.container}>
            {movies.map((movie, index) => (
              <Movie key={index} movie={movie} />
            ))}
          </div>
          <UCPagination
            pages={pages}
            setMovies={setMovies}
            setPages={setPages}
            setCurrentPage={setUccurrentPage}
            currentPage={uccurrentPage}
          />
        </>
      ) : (
        <div className={styles.container}>loading</div>
      )}
    </div>
  );
};

export default UCMovies;
