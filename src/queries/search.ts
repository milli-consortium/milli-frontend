import { gql } from 'apollo-boost';

const liftQuery = gql`
  query NiosxData(
    $blob: String!
    $date: DateRangeInput
    $lang: [LanguageInput!]
    $subjects: [SubjectInput!]
    $people: [PersonInput!]
    $places: [PlaceInput!]
    $partners: [PartnerInput!]
    $mediaTypes: [MediaType!]
  ) {
    searchCollections(
      entityFilterInputArg: {
        blob: $blob
        dateRange: $date
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
