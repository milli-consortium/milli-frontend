import { gql } from 'apollo-boost';

export const entityQuery = gql`
  query Entity($id: String!) {
    findEntity(id: $id) {
      graphId
      recordId
      agencyCode
      title
      partner {
        graphId
        displayName
      }
      creator
      dateOfCreation
      level
      unitId
      extent
      images {
        src
        alt
        size
      }
      subjects {
        graphId
        label
        prefLabel
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
      annotations {
        graphId
        context
        id
        type
        motivation
        body {
          ... on TextualBody {
            typ
            purpose
            value
          }
        }
        target {
          ... on SpecificResourceType {
            typ
            source
            targetId
          }
        }
      }
    }
  }
`;
