import { useState } from "react";
import { Link } from "react-router-dom";
// import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../utils/auth";

import { Layout, Button, Modal, Tabs } from "antd";
import customTheme from "../styles/customTheme";
const { Header } = Layout;

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
          }}
        >
          <div>
            <Link
              to="/"
              style={{
                color: "white",
                fontSize: "1.2rem",
                marginRight: "20px",
              }}
            >
              Beat Bound
            </Link>
            <Link
              to="/search-page"
              style={{ color: "white", marginRight: "20px" }}
            >
              Search
            </Link>
            {Auth.loggedIn() ? (
              <>
                <Link
                  to="/Profile"
                  style={{ color: "white", marginRight: "20px" }}
                >
                  My Profile
                </Link>
                <Button
                  type="link"
                  onClick={Auth.logout}
                  style={{ color: "white" }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                type="link"
                onClick={() => setShowModal(true)}
                style={{ color: "white" }}
              >
                Login/Sign Up
              </Button>
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
