import { gql } from 'apollo-boost';

export const entityQuery = gql`
  query Entity($id: String!) {
    findEntity(id: $id) {
      graphId
      agencyCode
      title
      partner
      dateOfCreation
      level
      images {
        src
        alt
        size
      }
      subjects
      description {
        body {
          typ
          value
          creator
        }
      }
    }
  }
`;
