import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

// const cache = new InMemoryCache();
// const link = new createHttpLink({
//   uri: 'http://localhost:4000/'
// });

// const client = new ApolloClient({
//   cache: cache,
//   link: link
// });

export default client;
