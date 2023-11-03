import { gql } from "@apollo/client";


export const GET_USERLAST15DAYSINTERESTS = gql`
query getUserLast15DaysFromInterests{
getUserLast15DaysFromInterests {
    code,
    codein
    name,
    favorite
    high,
    targetValue{
      buy
      sell
    }
    bid
    ask 
    low,
    varBid,
    timestamp
    lastDays{
      pctChange
    }
  }
}

`