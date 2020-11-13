/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
export const onCreateEventAvailability = /* GraphQL */ `
  subscription OnCreateEventAvailability {
    onCreateEventAvailability {
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
export const onUpdateEventAvailability = /* GraphQL */ `
  subscription OnUpdateEventAvailability {
    onUpdateEventAvailability {
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
export const onDeleteEventAvailability = /* GraphQL */ `
  subscription OnDeleteEventAvailability {
    onDeleteEventAvailability {
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
