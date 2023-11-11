import { gql } from "@apollo/client";


export const GET_USER_NOTIFICATIONS = gql`
query getUserNotifications {
  getUserNotifications {
        userId
        notifications {
          name
          description
          read
          userId
          createAt
        }
  }
}
`