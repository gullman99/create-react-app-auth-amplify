/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getEventAvailability = /* GraphQL */ `
  query GetEventAvailability($id: ID!) {
    getEventAvailability(id: $id) {
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
export const listEventAvailabilitys = /* GraphQL */ `
  query ListEventAvailabilitys(
    $filter: ModelEventAvailabilityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEventAvailabilitys(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        employeeId
        date
        startTime
        endTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
