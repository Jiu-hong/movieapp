import React from "react";

import { popPlaying } from "../../api";

import styles from "./PPPagination.module.css";

const PPPagination = ({
  pages,
  setMovies,
  setPages,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  const changePage = async (number) => {
    const { data } = await popPlaying(number);

    const { total_pages, results } = data;
    setMovies(results);
    setPages(total_pages);
    setCurrentPage(number);
  };

  const handlePrevPage = async () => {
    if (currentPage === 1) return;

    changePage(currentPage - 1);
  };

  const handleNextPage = async () => {
    if (currentPage === pages) return;

    changePage(currentPage + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.btnprevnext}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          prev
        </button>
        <button onClick={handleNextPage} disabled={currentPage === pages}>
          next
        </button>
      </div>
      <div className={styles.btnpages}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => changePage(number)}
            disabled={number === currentPage}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PPPagination;
