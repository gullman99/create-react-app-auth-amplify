/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      type
      firstName
      lastName
      email
      cellphone
      address
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
      type
      firstName
      lastName
      email
      cellphone
      address
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
      type
      firstName
      lastName
      email
      cellphone
      address
      createdAt
      updatedAt
    }
  }
`;
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      client
      employee
      service
      date
      startTime
      endTime
      color
      createdAt
      updatedAt
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      client
      employee
      service
      date
      startTime
      endTime
      color
      createdAt
      updatedAt
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      client
      employee
      service
      date
      startTime
      endTime
      color
      createdAt
      updatedAt
    }
  }
`;
export const createEventAvailability = /* GraphQL */ `
  mutation CreateEventAvailability(
    $input: CreateEventAvailabilityInput!
    $condition: ModelEventAvailabilityConditionInput
  ) {
    createEventAvailability(input: $input, condition: $condition) {
      id
      employeeId
      date
      startTime
      endTime
      createdAt
      updatedAt
    }
  }
`;
export const updateEventAvailability = /* GraphQL */ `
  mutation UpdateEventAvailability(
    $input: UpdateEventAvailabilityInput!
    $condition: ModelEventAvailabilityConditionInput
  ) {
    updateEventAvailability(input: $input, condition: $condition) {
      id
      employeeId
      date
      startTime
      endTime
      createdAt
      updatedAt
    }
  }
`;
export const deleteEventAvailability = /* GraphQL */ `
  mutation DeleteEventAvailability(
    $input: DeleteEventAvailabilityInput!
    $condition: ModelEventAvailabilityConditionInput
  ) {
    deleteEventAvailability(input: $input, condition: $condition) {
      id
      employeeId
      date
      startTime
      endTime
      createdAt
      updatedAt
    }
  }
`;
