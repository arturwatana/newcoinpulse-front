import { gql } from "@apollo/client";




export const FAVORITE_INTEREST = gql`
mutation favoriteInterest($data: FavoriteInterestDTO!) {
	favoriteInterest(data: $data){
		email,
		interests{
			from
			to
			favorite
		}
	}
}
`