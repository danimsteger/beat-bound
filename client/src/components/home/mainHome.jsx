import customTheme from "../../styles/customTheme";
import { Button } from "antd";
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
      <div>
        <Button></Button>
      </div>
    </div>
  );
};

export default MainHome;
