import { gql } from 'apollo-boost';

export const entityQuery = gql`
  query Entity($id: String!) {
    findEntity(id: $id) {
      graphId
      agencyCode
      title
      partner {
        graphId
        displayName
      }
      creator
      dateOfCreation
      level
      images {
        src
        alt
        size
      }
      subjects {
        graphId
        label
      }
      description {
        id
        body {
          ... on TextualBody {
            graphId
            value
            creator
          }
        }
        graphId
      }
    }
  }
`;
