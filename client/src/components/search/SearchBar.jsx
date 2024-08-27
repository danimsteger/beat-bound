// import React from "react";
// import { Row, Col, Form, Button } from "react-bootstrap";
import { Row, Col, Form, Button, Input, Select } from "antd";
import customTheme from "../../styles/customTheme";
const { Search } = Input;
const { Option } = Select;
const SearchBar = ({
  searchTerm,
  setSearchTerm,
  searchType,
  setSearchType,
  handleSearch,
}) => {
  return (
    <div style={{ margin: 40 }}>
      <Form>
        <Row align="middle" style={{ justifyContent: "center" }}>
          <Col xs={6} md={4} lg={4} style={{}}>
            <Search
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
            />
          </Col>
          <Col xs={6} md={2}>
            <Select
              value={searchType}
              onChange={(value) => setSearchType(value)}
            >
              <Option value="track">Track</Option>
              <Option value="artist">Artist</Option>
              <Option value="events">Events</Option>
            </Select>
          </Col>
          <Col xs={6} md={2}>
            <Button onClick={handleSearch}>Search</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchBar;
