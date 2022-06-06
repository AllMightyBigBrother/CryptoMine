import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { format } from 'timeago.js';
import "../styles/News.css";



const News = ({
  header,
  image,
  info,
  link,
  date,
}) => {

  return (
    <>
      <Card>
        <Card.Img variant="top" src={image ? image : `https://source.unsplash.com/random/?cryptocurrency`} />
        <Card.Body>
          <Card.Title><a href={link} target="_blank"><b>{header}</b></a></Card.Title>
          <Card.Text className="card-text">
            {info}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{format(date)}</small>
        </Card.Footer>
      </Card>
    </>
  );
};

export default News;