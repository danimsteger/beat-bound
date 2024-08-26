import { Outlet } from "react-router-dom";
import { ConfigProvider } from "antd";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Auth from "./utils/auth";
import customTheme from "./styles/customTheme"; // Import custom theme

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

console.log(customTheme);
function App() {
  return (
    <ApolloProvider client={client}>
      <ConfigProvider prefix="my-app" theme={customTheme}>
        <Nav />
        <Outlet />
        <Footer />
      </ConfigProvider>
    </ApolloProvider>
  );
}

export default App;
