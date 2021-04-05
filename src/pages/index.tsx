import React from 'react';
import { PageProps, graphql } from 'gatsby';
import Title from '@/components/Title';
import { GithubUserDataQuery } from '../../graphql-types';

const Home: React.FC<PageProps<GithubUserDataQuery>> = ({ data }) => (
  <main>
    <Title />
    <p>A TypeScript starter for Gatsby. Great for advanced users.</p>
    <p>
      Follow me on Twitter (
      <a href="https://twitter.com/jpedroschmitz">@jpedroschmitz</a>)
    </p>
    <p>{JSON.stringify(data)}</p>
  </main>
);

export default Home;

export const query = graphql`
  query GithubUserData {
    github {
      user(login: "jlouzado") {
        bio
        name
        createdAt
      }
    }
  }
`;
