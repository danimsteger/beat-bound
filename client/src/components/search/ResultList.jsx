import React from "react";
// import { Row, Col } from "react-bootstrap";
import { Row, Col } from "antd";
import ResultCard from "./ResultCard";

const ResultsList = ({ results, lastSearchType, handleAddToMyPage, isOnProfile }) => {
  return (
    <Row
      style={{
        margin: 10,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {results && results.length > 0 ? (
        results.map((result, index) => (
          <Col key={index} style={{ margin: 20, display: "flex" }}>
            <ResultCard
              result={result}
              type={lastSearchType}
              handleAddToMyPage={handleAddToMyPage}
              isOnProfile={isOnProfile}
            />
          </Col>
        ))
      ) : (
        <Col>
          <p>No results found</p>
        </Col>
      )}
    </Row>
  );
};

export default ResultsList;
