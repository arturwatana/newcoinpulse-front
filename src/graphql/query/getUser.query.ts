import { gql } from "@apollo/client";


export const GET_USER = gql`
query getUserByToken {
  getUserByToken {
        id
        fullName
        email
  }
}
`