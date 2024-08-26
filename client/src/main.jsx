import ReactDOM from "react-dom/client";
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NoMatch from "./pages/NoMatch.jsx";
import App from "./App.jsx";
import Home from "./pages/Home";
import Search from "./pages/Search.jsx";
import ArtistPage from "./pages/ArtistPage.jsx";
import Profile from "./pages/Profile.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/search-page",
        element: <Search />,
      },
      {
        path: "/ArtistPage/:artistId",
        element: <ArtistPage />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

