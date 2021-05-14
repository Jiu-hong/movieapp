import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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
import { fetchDetail, fetchImages } from "../../api";

import styles from "./Detail.module.css";

const Detail = () => {
  const { movieid } = useParams();

  const [detail, setDetail] = useState("");
  const [imgs, setImgs] = useState([]);
  const [currentslide, setCurrentslide] = useState(0);

  const rate = () => {
    switch (true) {
      case detail.vote_average < 1.5:
        return <Star1 />;
      case detail.vote_average < 2.5:
        return <Star2 />;
      case detail.vote_average < 3.5:
        return <Star3 />;
      case detail.vote_average < 4.5:
        return <Star4 />;
      case detail.vote_average < 5.5:
        return <Star5 />;
      case detail.vote_average < 6.5:
        return <Star6 />;
      case detail.vote_average < 7.5:
        return <Star7 />;
      case detail.vote_average < 8.5:
        return <Star8 />;
      case detail.vote_average < 9.5:
        return <Star9 />;
      case detail.vote_average <= 10:
        return <Star10 />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const func = async () => {
      const imgdetail = (await fetchDetail(movieid)).data;
      setDetail(imgdetail);

      const images = (await fetchImages(movieid)).data;

      setImgs(images);
    };

    func();

    return () => {
      setDetail("");
      setImgs([]);
    };
  }, [movieid]);

  const handleNext = () => {
    setCurrentslide((currentslide + 1) % imgs.backdrops.length);
  };

  const handlePrev = () => {
    if (currentslide === 0) return setCurrentslide(imgs.backdrops.length - 1);
    setCurrentslide(currentslide - 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.slideshowcontainer}>
        {imgs.backdrops &&
          imgs.backdrops.map((backdrop, index) => (
            <div
              key={index}
              className={currentslide === index ? styles.show : styles.hidden}
            >
              <div className={styles.numbertext}>
                {currentslide + 1} / {imgs.backdrops.length}
              </div>
              <a href={detail.homepage}>
                <img
                  src={`${imgBaseUrl}/w500${backdrop.file_path}`}
                  alt="file_path"
                  className={styles.slideimg}
                />
              </a>

              <span onClick={handlePrev} className={styles.slideprev}>
                &#10094;
              </span>
              <span onClick={handleNext} className={styles.slidenext}>
                &#10095;
              </span>
            </div>
          ))}
      </div>
      <br />

      <div className={styles.overview}>
        <h3>{detail.title} (overview)</h3>
        <p>{detail.overview}</p>
      </div>
      <div className={styles.genres}>
        <strong>genres: </strong>{" "}
        {detail.genres &&
          detail.genres.map((genre, index) => (
            <span key={index}>{genre.name} </span>
          ))}
      </div>
      <div className={styles.languages}>
        <strong>language(s):</strong>{" "}
        {detail.spoken_languages &&
          detail.spoken_languages.map((language, index) => (
            <span key={index}>{language.english_name} </span>
          ))}
      </div>
      <div className={styles.companies}>
        <strong>production companie(s):</strong>{" "}
        {detail.production_companies &&
          detail.production_companies.map((company, index) => (
            <div key={index}>{company.name} </div>
          ))}
      </div>
      <div className={styles.cardrelease}>
        <strong>Release:</strong> {detail.release_date}
      </div>
      <div className={styles.rate}>
        <strong>rate: </strong> {rate()} {detail.vote_average} (vote count:{" "}
        {detail.vote_count})
      </div>

      <div className={styles.cardpopularity}>
        <strong> popularity: </strong> {detail.popularity}
      </div>
      <Link to={`/recommendations/${movieid}`}>
        <span> RECOMMENDATIONS</span>
      </Link>
      <div className={styles.seperator}></div>
      <div className={styles.images}>
        {imgs?.posters?.length &&
          imgs.posters.map((poster, index) => (
            <div key={index}>
              <img
                className={styles.image}
                src={`${imgBaseUrl}/w300${poster.file_path}`}
                alt="poster"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Detail;
