import { gql } from "@apollo/client";




export const LOGIN_USER = gql`
mutation login($data: LoginUserDTO) {
  login(data: $data) {
    token
  }
}
`