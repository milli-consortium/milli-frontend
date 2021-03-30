import React from 'react'
import { graphql } from 'gatsby'
import { GithubUserDataQuery } from '../../graphql-types'

export default function Home(props: 
  { data: GithubUserDataQuery }) {
  return <div>Hello {props.data.github.user?.name || 'Stranger'}!</div>
}

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
`
