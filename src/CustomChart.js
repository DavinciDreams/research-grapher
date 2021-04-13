import React, { Component } from "react";
import { CardPanel, Col, Row } from "react-materialize";
import { ArxivIdContext } from "./Components/Context";
import { DocumentViewer } from "./DocumentViewer";
import { CitationsAndReferencesList } from "./CollectionNode";
import { NavBar } from "./Components/NavBar";

export default class CustomChart extends Component {
  static contextType = ArxivIdContext;

  render() {
    return (
      <React.Fragment>
        <NavBar />
        {this.context.id === "" && this.context.isLoading ? (
          <CardPanel>
            <h5> Please enter arXiv ID of the paper to begin </h5>
          </CardPanel>
        ) : (
          <ShowPaperInfo />
        )}
      </React.Fragment>
    );
  }
}

export const ShowPaperInfo = () => {
  return (
    <Row>
      <Col s={6}>
        <DocumentViewer />
      </Col>
      <Col s={6}>
        <CitationsAndReferencesList />
      </Col>
    </Row>
  );
};