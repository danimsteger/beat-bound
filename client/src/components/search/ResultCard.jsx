// import React from "react";
// import { Card, Button } from "react-bootstrap";
import { Card, Button, Tooltip, Image } from "antd";
import Auth from "../../utils/auth";
import { StarOutlined, SoundOutlined } from "@ant-design/icons";

const ResultCard = ({ result, type, handleAddToMyPage }) => {
  return (
    <Card style={{ margin: 5, width: 400 }}>
      {type === "track" && (
        <div>
          {result.imageURL && (
            <Image src={result.imageURL} style={{ borderRadius: 10 }} />
          )}
          <Card.Meta
            title={result.name}
            style={{ textAlign: "center", margin: 10 }}
            description={
              <>
                <strong>Artists:</strong>{" "}
                {result.artists.map((artist) => artist.name).join(", ")}
                <br />
                <strong>Album:</strong> {result.album}
              </>
            }
          />
          <Tooltip title="Listen on Spotify">
            <Button
              href={result.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              type="primary"
              // icon={<SoundOutlined />}
              shape="circle"
              style={{ margin: "10px" }}
              size="medium"
            >
              <img src="/spotify.png" alt="spotify logo" width="30px" />
            </Button>
          </Tooltip>
          {Auth.loggedIn() && (
            <Tooltip title="Add Song to Profile">
              <Button
                onClick={() => handleAddToMyPage(result)}
                type="primary"
                shape="circle"
                icon={<StarOutlined />}
                style={{ margin: "10px" }}
                size="medium"
              />
            </Tooltip>
          )}
          {result.previewUrl && (
            <div className="mt-3">
              <audio controls>
                <source src={result.previewUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      )}
      {type === "artist" && (
        <div>
          {result.imageURL && (
            <Image src={result.imageURL} style={{ borderRadius: 10 }} />
          )}
          <Card.Meta
            title={result.name}
            style={{ textAlign: "center", margin: 10 }}
          />
          <Tooltip title="View Artist on Spotify">
            <Button
              href={result.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              type="primary"
              style={{ margin: "10px" }}
              size="medium"
              shape="circle"
            >
              <img src="/spotify.png" alt="spotify logo" width="30px" />
            </Button>
          </Tooltip>
          {Auth.loggedIn() && (
            <Tooltip title="Add Artist to Profile">
              <Button
                onClick={() => handleAddToMyPage(result)}
                type="primary"
                shape="circle"
                icon={<StarOutlined />}
                style={{ margin: "10px" }}
                size="medium"
              ></Button>
            </Tooltip>
          )}
        </div>
      )}
      {type === "events" && (
        <div>
          <Card.Meta
            title={result.name}
            description={
              <>
                <strong>Date:</strong> {result.date}
                <br />
                <strong>Venue:</strong> {result.venue}, {result.city}
                <br />
              </>
            }
          />
          <Tooltip title="View on Ticketmaster">
            <Button
              href={result.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              type="primary"
              shape="circle"
              style={{ margin: "10px" }}
              size="medium"
            >
              <img
                src="/ticketmaster.white.png"
                alt="spotify logo"
                width="20px"
              />
            </Button>
          </Tooltip>
          {Auth.loggedIn() && (
            <Tooltip title="Add Event to Profile">
              <Button
                onClick={() => handleAddToMyPage(result)}
                shape="circle"
                icon={<StarOutlined />}
                style={{ margin: "10px" }}
                size="medium"
                type="primary"
              ></Button>
            </Tooltip>
          )}
        </div>
      )}
    </Card>
    // <Card>
    //   {type === "track" && (
    //     <>
    //       {result.imageURL && <Card.Img variant="top" src={result.imageURL} />}
    //       <Card.Body>
    //         <Card.Title>{result.name}</Card.Title>
    //         <Card.Text>
    //           <strong>Artists:</strong>{" "}
    //           {result.artists.map((artist) => artist.name).join(", ")}
    //           <br />
    //           <strong>Album:</strong> {result.album}
    //         </Card.Text>
    //         <Button
    //           href={result.externalUrl}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           variant="success"
    //         >
    //           Listen on Spotify
    //         </Button>
    //         {result.previewUrl && (
    //           <div className="mt-3">
    //             <audio controls>
    //               <source src={result.previewUrl} type="audio/mpeg" />
    //               Your browser does not support the audio element.
    //             </audio>
    //           </div>
    //         )}
    //         {Auth.loggedIn() && (
    //           <Button
    //             onClick={() => handleAddToMyPage(result)}
    //             variant="warning"
    //             className="mt-2"
    //           >
    //             Add to My Page
    //           </Button>
    //         )}
    //       </Card.Body>
    //     </>
    //   )}
    //   {type === "artist" && (
    //     <>
    //       {result.imageURL && <Card.Img variant="top" src={result.imageURL} />}
    //       <Card.Body>
    //         <Card.Title>{result.name}</Card.Title>
    //         <Button
    //           href={result.externalUrl}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           variant="success"
    //         >
    //           View on Spotify
    //         </Button>
    //         {Auth.loggedIn() && (
    //           <Button
    //             onClick={() => handleAddToMyPage(result)}
    //             variant="warning"
    //             className="mt-2"
    //           >
    //             Add to My Page
    //           </Button>
    //         )}
    //       </Card.Body>
    //     </>
    //   )}
    //   {type === "events" && (
    //     <Card.Body>
    //       <Card.Title>{result.name}</Card.Title>
    //       <Card.Text>
    //         <strong>Date:</strong> {result.date}
    //         <br />
    //         <strong>Venue:</strong> {result.venue}, {result.city}
    //         <br />
    //         <strong>Artists:</strong>{" "}
    //         {result.artist && result.artist.length > 0
    //           ? result.artist.map((artist) => artist.name).join(", ")
    //           : "Unknown Artists"}
    //       </Card.Text>
    //       <Button
    //         href={result.externalUrl}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         variant="success"
    //       >
    //         Get Tickets
    //       </Button>
    //       {Auth.loggedIn() && (
    //         <Button
    //           onClick={() => handleAddToMyPage(result)}
    //           variant="warning"
    //           className="mt-2"
    //         >
    //           Add to My Page
    //         </Button>
    //       )}
    //     </Card.Body>
    //   )}
    // </Card>
  );
};

export default ResultCard;
