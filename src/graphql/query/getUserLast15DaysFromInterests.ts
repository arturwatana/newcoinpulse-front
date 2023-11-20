import { gql } from "@apollo/client";


export const GET_USERLAST15DAYSINTERESTS = gql`
query getUserLast15DaysFromInterests{
getUserLast15DaysFromInterests {
  from,
  to
  lastPrice
  favorite
  highPrice,
  targetValue{
    buy
    sell
  }
  bidPrice
  askPrice
  lowPrice,
  priceChangePercent,
  }
}

`