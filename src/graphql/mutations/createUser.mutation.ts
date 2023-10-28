import { gql } from "@apollo/client";




export const CREATE_USER = gql`
mutation registerUser($data: UserDTO) {
  createUser(data: $data) {
    id
  }
}
`