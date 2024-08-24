import { List } from "antd";

function IndivPlaylist({ samplePlaylist }) {
  const slideStyle = {
    // position: "relative",
    textAlign: "center",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    // display: "block",
    // borderRadius: "20px",
  };

  return (
    <div style={slideStyle}>
      <a href={samplePlaylist.playlistUrl} target="_blank">
        <img
          src={samplePlaylist.imageUrl}
          alt={samplePlaylist.name}
          style={imageStyle}
        />
      </a>
    </div>
  );
}

export default IndivPlaylist;
