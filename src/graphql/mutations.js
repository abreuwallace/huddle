/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPendency = /* GraphQL */ `
  mutation CreatePendency(
    $input: CreatePendencyInput!
    $condition: ModelPendencyConditionInput
  ) {
    createPendency(input: $input, condition: $condition) {
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
export const updatePendency = /* GraphQL */ `
  mutation UpdatePendency(
    $input: UpdatePendencyInput!
    $condition: ModelPendencyConditionInput
  ) {
    updatePendency(input: $input, condition: $condition) {
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
export const deletePendency = /* GraphQL */ `
  mutation DeletePendency(
    $input: DeletePendencyInput!
    $condition: ModelPendencyConditionInput
  ) {
    deletePendency(input: $input, condition: $condition) {
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
