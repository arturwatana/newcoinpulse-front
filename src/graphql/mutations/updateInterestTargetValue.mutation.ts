


import { gql } from "@apollo/client";




export const UPDATE_INTEREST_TARGETVALUE = gql`
mutation updateInterestTargetValue($data: updateInterestTargetValueDTO!) {
    updateInterestTargetValue(data: $data) {
    token
  }
}
`