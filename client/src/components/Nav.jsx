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
            // display: "flex",
            // justifyContent: "space-between",
            // alignItems: "center",
            backgroundColor: customTheme.token.colorDanger,
            textDecoration: "none",
            padding: 15,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              <Link
                to="/"
                style={{
                  color: "white",
                  fontSize: "1.8rem",
                  marginRight: "5px",
                  textDecoration: "none",
                  fontWeight: "normal",
                  transition: "text-shadow 0.3s",
                  textShadow: "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textShadow = "1px 1px 2px grey";
                  e.target.style.fontWeight = "bold";
                }} // Add text shadow on hover
                onMouseLeave={(e) => {
                  e.target.style.textShadow = "none";
                  e.target.style.fontWeight = "normal";
                }}
                className="bungee-regular nav-title"
              >
                🎧 Beat Bound
              </Link>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <Link
                to="/search-page"
                style={{
                  color: customTheme.token.colorSecondary,
                  marginRight: "5px",
                  textDecoration: "none",
                  fontWeight: "normal",
                  transition: "text-shadow 0.3s",
                  textShadow: "none",
                  fontSize: "1.3rem",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textShadow = "1px 1px 2px grey";
                  e.target.style.fontWeight = "bold";
                }} // Add text shadow on hover
                onMouseLeave={(e) => {
                  e.target.style.textShadow = "none";
                  e.target.style.fontWeight = "normal";
                }}
                className="concert-one-regular"
              >
                <ul className="nav-item">SEARCH </ul>
              </Link>
              {Auth.loggedIn() ? (
                <>
                  <Link
                    to="/Profile"
                    style={{
                      color: customTheme.token.colorSecondary,
                      marginRight: "5px",
                      textDecoration: "none",
                      fontWeight: "normal",
                      transition: "text-shadow 0.3s",
                      textShadow: "none",
                      fontSize: "1.3rem",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.textShadow = "1px 1px 2px grey";
                      e.target.style.fontWeight = "bold";
                    }} // Add text shadow on hover
                    onMouseLeave={(e) => {
                      e.target.style.textShadow = "none";
                      e.target.style.fontWeight = "normal";
                    }}
                    className="concert-one-regular"
                  >
                    <ul>PROFILE</ul>{" "}
                  </Link>

                  <ul
                    onClick={Auth.logout}
                    style={{
                      color: customTheme.token.colorSecondary,
                      textDecoration: "none",
                      fontWeight: "normal",
                      transition: "text-shadow 0.3s",
                      textShadow: "none",
                      fontSize: "1.3rem",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.textShadow = "1px 1px 2px grey";
                      e.target.style.fontWeight = "bold";
                    }} // Add text shadow on hover
                    onMouseLeave={(e) => {
                      e.target.style.textShadow = "none";
                      e.target.style.fontWeight = "normal";
                    }}
                    className="concert-one-regular"
                  >
                    <a>LOGOUT</a>
                  </ul>
                </>
              ) : (
                <ul
                  onClick={() => setShowModal(true)}
                  style={{
                    color: customTheme.token.colorSecondary,
                    textDecoration: "none",
                    fontWeight: "normal",
                    transition: "text-shadow 0.3s",
                    textShadow: "none",
                    fontSize: "1.3rem",
                  }}
                  className="concert-one-regular"
                  onMouseEnter={(e) => {
                    e.target.style.textShadow = "1px 1px 2px grey";
                    e.target.style.fontWeight = "bold";
                  }} // Add text shadow on hover
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = "none";
                    e.target.style.fontWeight = "normal";
                  }}
                >
                  <a>LOGIN / SIGNUP</a>
                </ul>
              )}
            </div>
          </div>
        </Header>
      </Layout>

      <Modal
        title="Login/Sign Up"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        className="concert-one-regular"
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

{
  /* <Modal
        title="Login/Sign Up"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        className="concert-one-regular"
      >
        <Tabs defaultActiveKey="login">
          <Tabs.TabPane tab="Login" key="login">
            <LoginForm handleModalClose={() => setShowModal(false)} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Sign Up" key="signup">
            <SignupForm handleModalClose={() => setShowModal(false)} />
          </Tabs.TabPane>
        </Tabs>
      </Modal> */
}
