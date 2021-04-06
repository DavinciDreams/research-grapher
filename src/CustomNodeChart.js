import React, { Component } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import { MyNode } from "./MyNode";
import * as tree_util from "tree-util";
import * as GraphLib from "@dagrejs/graphlib";
import { Card } from "react-materialize";
export default class CustomNodeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiDataForDebug: false,
    };
  }
  componentDidMount() {
    // TODO: mount ID to buttons of references and citations
    let arXivID = "1710.09829";
    fetchPaperDetailsFromAPI(arXivID).then((result) => {
      this.convertDataToTree(result);
    });
  }
  convertDataToTree(result) {
    let parsedResult = JSON.parse(
      JSON.stringify(result)
        .split('"title":')
        .join('"name":')
        .split('"references":')
        .join('"children":')
    );

    var referenceArray = addCitingPaperToChild(parsedResult);
    // replace existing children with cited children
    parsedResult.children = referenceArray;

    // this.setState({
    //   apiDataForDebug: parsedResult,
    // });

    // TODO: use the following when tree library is ready for root node updates
    // let { children, ...parsedResultNoChild } = parsedResult;
    // referenceArray.push(parsedResultNoChild);
    // var standardConfig = { id: "name", parentid: "referredBy" };
    // var trees = tree_util.buildTrees(referenceArray, standardConfig);
    // let tree = trees[0];
    // tree.rootNode.addParent(["asdf"]);

    var graph = new GraphLib.Graph({ compound: true });
    referenceArray.map((paper) => {
      // console.log(paper);
      graph.setNode(paper.name, paper);
      graph.setEdge(paper.name, paper.referredBy);
    });

    // console.log(graph.edges());
    console.log(GraphLib.json.write(graph));
  }

  render() {
    if (this.state.apiDataForDebug) {
      const ds = this.state.apiDataForDebug;
      console.log(ds.children);
      return (
        <div className="container">
          <OrganizationChart
            datasource={ds}
            NodeTemplate={MyNode}
            pan={true}
            zoom={true}
          />
        </div>
      );
    }
    return (
      <div>
     nothing
      </div>
    );
  }
}
function fetchPaperDetailsFromAPI(arXivID) {
  return fetch(
    "https://api.semanticscholar.org/v1/paper/arXiv:" +
      arXivID +
      "?include_unknown_references=true"
  ).then(
    (res) => res.json(),
    // fetch error
    (error) => {}
  );
}

function addCitingPaperToChild(parsedResult) {
  return parsedResult.children.map((child) => {
    return { ...child, referredBy: parsedResult.name };
  });
}
const ds = {
  id: "n1",
  name: "Lao Lao",
  title: "general manager",
  children: [
    { id: "n2", name: "Bo Miao", title: "department manager" },
    {
      id: "n3",
      name: "Su Miao",
      title: "department manager",
      children: [
        { id: "n4", name: "Tie Hua", title: "senior engineer" },
        {
          id: "n5",
          name: "Hei Hei",
          title: "senior engineer",
          children: [
            { id: "n6", name: "Dan Dan", title: "engineer" },
            { id: "n7", name: "Xiang Xiang", title: "engineer" },
          ],
        },
        { id: "n8", name: "Pang Pang", title: "senior engineer" },
      ],
    },
    { id: "n9", name: "Hong Miao", title: "department manager" },
    {
      id: "n10",
      name: "Chun Miao",
      title: "department manager",
      children: [{ id: "n11", name: "Yue Yue", title: "senior engineer" }],
    },
  ],
};
