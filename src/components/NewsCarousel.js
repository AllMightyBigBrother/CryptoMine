import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "../styles/NewsCarousel.css";

const NewsCarousel = ({ t_news }) => {
  const [tnews, setTNews] = useState([]);
  useEffect(() => {
    setTNews(t_news?.articles);
  }, [t_news]);
  return (
    <Carousel>
      {tnews.map((n, i) => {
        return (
          <Carousel.Item key={i}>
            <div style={{ objectFit: "contain" }}>
              <img
                className="d-block w-100"
                src={
                  n.urlToImage
                    ? n.urlToImage
                    : `https://source.unsplash.com/random/?cryptocurrency`
                }
                style={{ height: "500px", width: "80%" }}
              />
            </div>

            <Carousel.Caption>
              <h1>
                <a className="carousel-link" href={n.url} target="_blank">
                  <b>{n.title}</b>
                </a>
              </h1>
              {/* <p>{n.description}</p> */}
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default NewsCarousel;
