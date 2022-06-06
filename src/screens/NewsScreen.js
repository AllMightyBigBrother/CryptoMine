import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { Col, Form, Row } from "react-bootstrap";
import Pagination from "@material-ui/lab/Pagination";
import ErrorMessage from "../components/ErrorMessage";

import "../styles/CategoryScreen.css";
import { listNews } from "../actions/newsAction";
import News from "../components/News";
import NewsCarousel from "../components/NewsCarousel";

const NewsScreen = () => {
  const [e_news, setE_News] = useState([]);
  const [t_news, setT_News] = useState([]);
  const [search, setSearch] = useState("Crypto");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [_loading, set_Loading] = useState(true);

  const newsList = useSelector((state) => state.newsList);
  const { loading, news, error } = newsList;
  let { enews, tnews } = news !== undefined ? news : [];

  useEffect(() => {
    dispatch(listNews(search, page, pageSize));
    console.log("1->", enews);
  }, [page, pageSize]);

  useEffect(() => {
    if (search === "") {
      setSearch("Crypto");
      console.log("2->", enews);
    } else {
      dispatch(listNews(search, page, pageSize));
      console.log("2->", enews);
    }
  }, [search, page, pageSize]);

  useEffect(() => {
    if (enews !== undefined) setE_News(enews);
    setT_News(tnews);
    set_Loading(loading);
    console.log("3->", enews);
    console.log("4->", e_news);
  }, [news, loading]);

  const handleChange = (_, value) => {
    setPage(value);
  };

  return (
    <div className="category-app">
      <div className="category-search">
        <h2 className="category-text">Top News</h2>
        <p className="category-global">
          “If you don’t believe it or don’t get it, I don’t have the time to try
          to convince you, sorry.” – <sub>Satoshi Nakamoto</sub>
        </p>
        <Form className="search-box d-flex" autoComplete="off">
          <Form.Control
            autocomplete="false"
            type="text"
            name="q"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          ></Form.Control>
        </Form>
      </div>
      {_loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage variant="danger">{error}</ErrorMessage>
      ) : (
        <>
          <NewsCarousel t_news={t_news} />
          <Row>
            {e_news.length !== 0 &&
              e_news?.articles?.map((n, i) => {
                return (
                  <Col xs={3} style={{ height: "500px" }}>
                    <News
                      key={i}
                      header={n.title}
                      author={n.author}
                      image={n.urlToImage}
                      info={n.description}
                      link={n.url}
                      date={n.publishedAt}
                    />
                  </Col>
                );
              })}
          </Row>
          <Pagination
            count={Math.floor(96 / pageSize)}
            page={page}
            onChange={handleChange}
            size="large"
            variant="outlined"
            color="primary"
            showFirstButton
            showLastButton
          />
        </>
      )}
    </div>
  );
};

export default NewsScreen;
