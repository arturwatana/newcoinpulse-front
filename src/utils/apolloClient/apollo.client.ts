
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import {onError} from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context";

const apolloServerURL = "https://currency-graphql.onrender.com/graphql"
const localURL = "http://localhost:4000/graphql"

const httpLink = createHttpLink({
  uri: apolloServerURL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("coinpulse_user_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});
