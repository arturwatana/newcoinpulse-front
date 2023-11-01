import { gql } from "@apollo/client";


export const GET_USERSEARCHES = gql`
query searches {
  searches {
        from
        to
        name
        buy
        sell
        high
        low
        create_date
  }
}
`