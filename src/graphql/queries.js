/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      login
      password
      department
      profile
      name
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        login
        password
        department
        profile
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPendency = /* GraphQL */ `
  query GetPendency($id: ID!) {
    getPendency(id: $id) {
      id
      name
      description
      department
      createdBy
      status
      local
      deadline
      fineshedAt
      equipment
      createdAt
      updatedAt
    }
  }
`;
export const listPendencys = /* GraphQL */ `
  query ListPendencys(
    $filter: ModelPendencyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPendencys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        department
        createdBy
        status
        local
        deadline
        fineshedAt
        equipment
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
