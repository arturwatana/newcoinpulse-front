


import { gql } from "@apollo/client";




export const CREATE_INTEREST = gql`
mutation createInterest($data: InterestDTO!) {
    createInterest(data: $data) {
    from,
    to,
    targetValue
  }
}
`