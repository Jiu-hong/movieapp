import React, { useState } from "react";
import { Link } from "react-router-dom";
import cx from "classnames";

import styles from "./Nav.module.css";

const Nav = () => {
  const [navflag, setNavflag] = useState(1);
  const [navopen, setNavopen] = useState(false);

  return (
    <>
      <button
        className={navopen ? cx(styles.ham, styles.hidden) : styles.ham}
        onClick={() => setNavopen(true)}
      >
        <i className="fas fa-bars"></i>
      </button>
      <nav
        className={
          navopen ? styles.container : cx(styles.container, styles.hidden)
        }
      >
        <button className={styles.clo} onClick={() => setNavopen(false)}>
          x
        </button>
        <Link
          to="/"
          onClick={() => {
            setNavflag(1);
            setNavopen(false);
          }}
          className={navflag === 1 ? styles.active : null}
        >
          <li>Now Playing</li>
        </Link>
        <Link
          to="/upcoming"
          onClick={() => {
            setNavflag(2);
            setNavopen(false);
          }}
          className={navflag === 2 ? styles.active : null}
        >
          <li>Upcoming</li>
        </Link>
        <Link
          to="/popular"
          onClick={() => {
            setNavflag(3);
            setNavopen(false);
          }}
          className={navflag === 3 ? styles.active : null}
        >
          <li>Popular</li>
        </Link>
        <Link
          to="/top"
          onClick={() => {
            setNavflag(4);
            setNavopen(false);
          }}
          className={navflag === 4 ? styles.active : null}
        >
          <li>Top Rating</li>
        </Link>
      </nav>
    </>
  );
};

export default Nav;
