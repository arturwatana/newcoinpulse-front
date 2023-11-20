import { gql } from "@apollo/client";


export const GET_USERSEARCHES = gql`
query searches {
  searches {
    from,
	to,
	high
	buy
	sell
	lastPrice	
	varPrice
	create_date
  }
}
`