
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { toast } from "react-toastify";

const apolloServerURL = "https://currency-graphql.onrender.com/graphql"
const localURL = "http://localhost:4000/graphql"

const httpLink = createHttpLink({
  uri: localURL,
});


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors){
    graphQLErrors.forEach(({ message, locations, path }) =>
    toast.error(
        message,
      ),
    );
  }

  if (networkError) toast.error(`Ops, tente novamente mais tarde.`);
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
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
