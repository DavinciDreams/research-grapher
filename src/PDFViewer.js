import React, { useEffect, useState } from "react";
import { Card, ProgressBar } from "react-materialize";
import { useSelector } from "react-redux";

export const PDFViewer = (props) => {
  const [paperId, setPaperId] = useState("");

  const [progressBar, setProgressBar] = useState(true);
  var id = useSelector((state) => state.paperReducer.id);
  useEffect(() => (id ? setPaperId(id) : null));

  return (
    <Card title="Preview">
      <div className="video-container">
        {progressBar ? <ProgressBar /> : null}
        <iframe
          src={`https://arxiv.org/pdf/${paperId}.pdf`}
          frameBorder="0"
          onLoad={(event) => setProgressBar(false)}
          allowFullScreen
        />
      </div>
    </Card>
  );
};
