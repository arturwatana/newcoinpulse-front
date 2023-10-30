import { gql } from "@apollo/client";


export const GET_FREE_CURRENCY = gql`
mutation createFreeCurrency($data: CurrencyReq!) {
    createFreeCurrency(data: $data) {
    id
    name
    from,
    to
    high
    low
    create_date
  }
}
`
export const GET_CURRENCY = gql`
mutation createCurrency($data: CurrencyReq!) {
    createCurrency(data: $data) {
    id
    name
    from,
    to
    high
    low
    create_date
  }
}
`