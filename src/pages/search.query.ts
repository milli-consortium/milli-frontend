import { gql } from 'apollo-boost';

const liftQuery = gql`
  query NiosxData {
    searchCollections {
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
            id
            displayName
            recordCount
            isSelected
          }
          subjects {
            id
            displayName
            recordCount
            isSelected
          }
          people {
            id
            displayName
            recordCount
            isSelected
          }
          places {
            id
            displayName
            recordCount
            isSelected
          }
          partners {
            id
            displayName
            recordCount
            isSelected
          }
          mediaTypes {
            id
            displayName
            recordCount
            isSelected
          }
        }
      }
    }
  }
`;

export default liftQuery;
