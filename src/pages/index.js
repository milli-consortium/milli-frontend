import React from 'react'
import { graphql } from 'gatsby'

export default function Home({ data }) {
  return <div>Hello {data.github.user.name}!</div>
}

export const query = graphql`
  query MyQuery {
    github {
      user(login: "jlouzado") {
        bio
        name
        createdAt
      }
    }
  }
`
