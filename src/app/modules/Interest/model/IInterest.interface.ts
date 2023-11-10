


export interface IInterest {
    ask: string
    bid: string
    code: string
    codein: string
    favorite: boolean
    high: string
    low: string
    targetValue: {
        buy: number
        sell: number
    } 
    timestamp: string
    varBid: string
    lastDays: any[]
}