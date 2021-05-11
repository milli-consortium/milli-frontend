import { gql } from 'apollo-boost';

const liftQuery = gql`
  query NiosxData(
    $blob: String
    $date: DateRangeInput
    $lang: [String!]
    $subjects: [String!]
    $people: [String!]
    $places: [String!]
    $partners: [String!]
    $mediaTypes: [String!]
  ) {
    searchCollections(
      filterBy: {
        blob: $blob
        date: $date
        lang: $lang
        subjects: $subjects
        people: $people
        places: $places
        partners: $partners
        mediaTypes: $mediaTypes
      }
    ) {
      edges {
        node {
          graphId
          title
          partner
          subjects
          dateOfCreation
          images {
            src
            alt
            size
          }
        }
        cursor
        offset
        isDirectMatch
        annotationMatchCount
      }
      pageInfo {
        endCursor
        hasNextPage
        filters {
          blob
          date {
            from
            to
          }
          lang {
            ...filterFields
          }
          subjects {
            ...filterFields
          }
          people {
            ...filterFields
          }
          places {
            ...filterFields
          }
          partners {
            ...filterFields
          }
          mediaTypes {
            ...filterFields
          }
        }
      }
    }
  }

  fragment filterFields on FilterValue {
    id
    displayName
    recordCount
    isSelected
  }
`;

export default liftQuery;
