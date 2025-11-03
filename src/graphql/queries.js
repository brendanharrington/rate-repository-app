import { gql } from '@apollo/client';

// fragment ReviewParts on Repository

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
    }
  }
`

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`

export const GET_REVIEWS_BY_ID = gql`
  query GetReviewsById($repositoryId: ID!) {
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
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
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