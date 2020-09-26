import React from "react";
import {
  Accordion,
  Card,
  Popover,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import { apiCall } from "../services/api";

const API_KEY = "ac38c8095da24fde8d7bea2f36ca48fa";

class NewsCard extends React.Component {
  state = {
    expand: false,
    articles: {},
    popName: "",
  };

  handleClick = (country) => {
    this.setState(
      (prevState) => ({ expand: !prevState.expand, popName: "" }),
      () => {
        const { expand, articles } = this.state;
        if (!expand || articles.length) return;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=5&apiKey=${API_KEY}`;
        const method = "get";
        apiCall(method, url).then(({ articles }) => {
          const accordionContent = this.getNameAndUrl(articles);
          this.setState({ articles: accordionContent });
        });
      }
    );
  };

  getNameAndUrl = (articlesArr) =>
    articlesArr.reduce((accumulator, { author, url, title }) => {
      if (author && !accumulator[author]) accumulator[author] = { url, title };
      return accumulator;
    }, {});

  openPopover = (name) => this.setState({ popName: name });

  render() {
    const { searchTerm, children, eventKey } = this.props;
    const { articles, popName } = this.state;
    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey={eventKey}
            onClick={() => this.handleClick(searchTerm)}
          >
            {children} news
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={eventKey}>
          <Card.Body>
            {articles
              ? Object.entries(articles).map(([name, { url, title }], i) => (
                  <OverlayTrigger
                    show={popName === name}
                    key={name}
                    placement="left"
                    overlay={
                      <Popover id={`popover-positioned-left`}>
                        <Popover.Title as="h3">{name}</Popover.Title>
                        <Popover.Content>
                          <a
                            href={`${url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {title}
                          </a>
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <button
                      className="news-button"
                      onClick={() => this.openPopover(name)}
                    >
                      @ {name}
                    </button>
                  </OverlayTrigger>
                ))
              : null}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }
}

export default NewsCard;
