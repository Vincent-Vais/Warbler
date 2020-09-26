import React from "react";
import { Accordion } from "react-bootstrap";
import NewsCard from "../containers/NewsCard";

const NewsAside = () => {
  const topics = {
    US: "us",
    Germany: "de",
    France: "fr",
    Canada: "ca",
  };
  return (
    <div className="col-sm-3">
      <Accordion>
        {Object.entries(topics).map(([key, val], i) => (
          <NewsCard searchTerm={val} key={i} eventKey={i + 1}>
            {key}
          </NewsCard>
        ))}
      </Accordion>
    </div>
  );
};

export default NewsAside;
