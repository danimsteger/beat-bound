import React from 'react';
import { Row, Col } from "react-bootstrap";
import ResultCard from './ResultCard';

const ResultsList = ({ results, lastSearchType, handleAddToMyPage }) => {
  return (
    <Row className="mt-4">
      {results && results.length > 0 ? (
        results.map((result, index) => (
          <Col xs={12} md={6} lg={4} className="mb-4" key={index}>
            <ResultCard 
              result={result} 
              type={lastSearchType} 
              handleAddToMyPage={handleAddToMyPage} 
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
