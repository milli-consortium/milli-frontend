import { gql } from 'apollo-boost';

const liftQuery = gql`
  query NiosxData(
    $next: Int = 10
    $cursor: String!
    $blob: String!
    $date: DateRangeInput
    $lang: [String!]
    $subjects: [String!]
    $people: [String!]
    $places: [String!]
    $partners: [String!]
  ) {
    searchCollections(
      next: $next
      cursor: $cursor
      entityFilterInputArg: {
        blob: $blob
        dateRange: $date
        lang: $lang
        subjects: $subjects
        people: $people
        places: $places
        partners: $partners
      }
    ) {
      edges {
        node {
          graphId
          title
          partner {
            graphId
            displayName
          }
          subjects {
            graphId
            label
          }
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
          dateRange {
            from
            to
          }
          lang {
            graphId
            langId
            displayName
            isSelected
          }
          subjects {
            graphId
            label
            isSelected
          }
          people {
            graphId
            displayName
            isSelected
          }
          places {
            graphId
            displayName
            isSelected
          }
          partners {
            graphId
            displayName
            isSelected
          }
        }
      }
    }
  }
`;

export default liftQuery;
