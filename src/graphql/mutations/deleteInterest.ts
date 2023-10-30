import { gql } from "@apollo/client";




export const DELETE_INTEREST = gql`
mutation deleteInterest($data: DeleteInterestDTO!){
   deleteInterest(data: $data){
    id
  }
}
`