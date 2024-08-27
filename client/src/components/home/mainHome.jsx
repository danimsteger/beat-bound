import customTheme from "../../styles/customTheme";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const MainHome = () => {
  return (
    <div
      style={{
        backgroundColor: customTheme.token.colorSecondary,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      <h3 className="concert-one-regular" style={{ fontSize: 40 }}>
        Welcome to
      </h3>
      <h1
        className="bungee-regular home-title"
        style={{ marginBottom: 20, fontSize: 100 }}
      >
        {" "}
        Beat Bound
      </h1>
      <div className="hidden-text">
        <h3 className=" concert-one-regular">Discover New Music</h3>
        <h4 className="concert-one-regular">& Save it for Later</h4>
      </div>
      <div style={{ margin: 50 }}>
        <Link to={`/search-page`}>
          <Button
            size="large"
            style={{ fontSize: 30, color: customTheme.token.colorSecondary }}
            className="bungee-regular"
          >
            {" "}
            Explore {<SearchOutlined />}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MainHome;
