import React from 'react';
import { Row, Col, Form, Button } from "react-bootstrap";

const SearchBar = ({ searchTerm, setSearchTerm, searchType, setSearchType, handleSearch }) => {
  return (
    <Form>
      <Row className="align-items-center">
        <Col xs={12} md={8}>
          <Form.Control
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
        </Col>
        <Col xs={6} md={2}>
          <Form.Select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="track">Track</option>
            <option value="artist">Artist</option>
            <option value="events">Events</option>
          </Form.Select>
        </Col>
        <Col xs={6} md={2}>
          <Button onClick={handleSearch} variant="primary">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;
