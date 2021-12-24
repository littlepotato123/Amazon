import {
  ApolloClient, ApolloProvider, gql, InMemoryCache
} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const client = new ApolloClient({
  uri: 'https://amazon-api-personal-project.herokuapp.com/',
  cache: new InMemoryCache(),
})

client
  .query({
    query: gql`
      {
        all_items {
          id
          price
          bought_count
          name
          tags
        }
      } 
    `
  })
  .then(result => console.log(result));

ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  document.getElementById('root')
);