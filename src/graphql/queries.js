import { gql } from '@apollo/client';

// fragment ReviewParts on Repository

export const GET_REPOSITORIES = gql`
  query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $first: Int, $after: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, first: $first, after: $after) {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
          url
          ownerName
          reviews {
            edges {
              node {
                user {
                  username
                  id
                }
                repository {
                  fullName
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
`

export const ME = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            createdAt
            rating
            repository {
              fullName
              id
            }
            text
            id
          }
        }
      }
    }
  }
`

export const GET_REVIEWS_BY_ID = gql`
  query GetReviewsById($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      ownerName
      url
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`

export const GET_ALL_REVIEWS = gql`
  query GetAllReviews {
    repositories {
      edges {
        node {
          reviews {
            edges {
              node {
                user {
                  username
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      edges {
        node {
          id
          username
        }
      }
    }
  }
`