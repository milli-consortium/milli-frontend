import { gql } from 'apollo-boost';

export const addAnnotationMutation = gql`
  mutation AnnotationInput(
    $body: BodyInput!
    $concept: String
    $motivation: String!
    $target: Target!
    $targetId: String!
  ) {
    addAnnotation(
      annotation: {
        targetId: $targetId
        target: $target
        motivation: $motivation
        concept: $concept
        body: $body
      }
    ) {
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
`;
