import { useState } from "react";
import { Link } from "react-router-dom";
// import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../utils/auth";

import { Layout, Modal, Tabs, Typography } from "antd";
import customTheme from "../styles/customTheme";
const { Header } = Layout;
const { Text } = Typography;

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: customTheme.token.colorPrimary,
            textDecoration: "none",
          }}
        >
          <div style={{ display: "flex" }}>
            <Link
              to="/"
              style={{
                color: "white",
                fontSize: "1.2rem",
                marginRight: "20px",
                textDecoration: "none",
                fontWeight: "normal",
                transition: "text-shadow 0.3s",
                textShadow: "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.textShadow = "1px 1px 4px white";
                e.target.style.fontWeight = "bold";
              }} // Add text shadow on hover
              onMouseLeave={(e) => {
                e.target.style.textShadow = "none";
                e.target.style.fontWeight = "normal";
              }}
            >
              🎧 Beat Bound

            </Link>
            <Link
              to="/search-page"
              style={{
                color: "white",
                marginRight: "20px",
                textDecoration: "none",
                fontWeight: "normal",
                transition: "text-shadow 0.3s",
                textShadow: "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.textShadow = "1px 1px 4px white";
                e.target.style.fontWeight = "bold";
              }} // Add text shadow on hover
              onMouseLeave={(e) => {
                e.target.style.textShadow = "none";
                e.target.style.fontWeight = "normal";
              }}
            >
              <ul>Search 🔍</ul>

            </Link>
            {Auth.loggedIn() ? (
              <>
                <Link
                  to="/Profile"
                  style={{
                    color: "white",
                    marginRight: "20px",
                    textDecoration: "none",
                    fontWeight: "normal",
                    transition: "text-shadow 0.3s",
                    textShadow: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textShadow = "1px 1px 4px white";
                    e.target.style.fontWeight = "bold";
                  }} // Add text shadow on hover
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = "none";
                    e.target.style.fontWeight = "normal";
                  }}
                >
                  <ul>My Profile</ul>{" "}
                </Link>

                <ul
                  onClick={Auth.logout}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "normal",
                    transition: "text-shadow 0.3s",
                    textShadow: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textShadow = "1px 1px 4px white";
                    e.target.style.fontWeight = "bold";
                  }} // Add text shadow on hover
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = "none";
                    e.target.style.fontWeight = "normal";
                  }}
                >
                  <a>Logout</a>
                </ul>
              </>
            ) : (
              <ul
                onClick={() => setShowModal(true)}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "normal",
                  transition: "text-shadow 0.3s",
                  textShadow: "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textShadow = "1px 1px 4px white";
                  e.target.style.fontWeight = "bold";
                }} // Add text shadow on hover
                onMouseLeave={(e) => {
                  e.target.style.textShadow = "none";
                  e.target.style.fontWeight = "normal";
                }}
              >
                <a>Login/Signup</a>
              </ul>
            )}
          </div>
        </Header>
      </Layout>

      <Modal
        title="Login/Sign Up"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Tabs defaultActiveKey="login">
          <Tabs.TabPane tab="Login" key="login">
            <LoginForm handleModalClose={() => setShowModal(false)} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Sign Up" key="signup">
            <SignupForm handleModalClose={() => setShowModal(false)} />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default AppNavbar;
