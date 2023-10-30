


import { gql } from "@apollo/client";




export const LOGIN_USER = gql`
mutation updateInterestTargetValue($data: updateInterestTargetValueDTO!) {
    updateInterestTargetValue(data: $data) {
    token
  }
}
`