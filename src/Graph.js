import React, { Component } from "react";
import { ArxivIdContext } from "./Components/Context";
import * as M from "materialize-css";
import { CustomModal } from "./Components/CustomModal";
import { Col, Row } from "react-materialize";
import GraphRenderer from "./GraphRenderer";
import { store } from "./store";
import { JSONGraphProcessor } from "./Components/GraphProcessor";

export class Graph extends Component {
  static contextType = ArxivIdContext;
  state = { modal: null };
  onClickNode(nodeId, node) {
    var modalOptions = {
      bottomSheet: true,
      id: "graphpapermodal",
    };
    this.setState({
      modal: <CustomModal modalOptions={modalOptions} node={node.attributes} />,
    });

    M.Modal.getInstance(document.getElementById("graphpapermodal")).open();
  }
  onDoubleClickNode = function (nodeId, node) {
    window.alert(
      `Double clicked node ${nodeId} in position (${node.x}, ${node.y})`
    );
  };

  render() {
    if (!this.context.isLoading) {
      var json = this.context.paperDetails;
      const { citations, references, ...data } = json;
      JSONGraphProcessor.updateStoreGraph(data, citations, references);

      return (
        <Row>
          <Col s={6} l={6}>
            <GraphRenderer
              onClickNode={(nodeId, node) => {
                this.onClickNode(nodeId, node);
              }}
              onDoubleClickNode={(nodeId, node) => {
                this.onDoubleClickNode(nodeId, node);
              }}
            />
          </Col>
          {this.state.modal}
        </Row>
      );
    } else {
      return <div></div>;
    }
  }
}
