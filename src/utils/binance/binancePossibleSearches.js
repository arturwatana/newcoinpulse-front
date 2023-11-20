


const binanceData = require("./binance-possible.js")

export function searchByOption(option){
   return binanceData.filter(search => {
        if(search.from === option){
            return search
        }
        return 
    })
}

const onlyZRX = binanceData.filter(search => {
    if(search.from === "BTC"){
        return search
    }
    return 
})

const primaryOptions = binanceData.map(search => {
    return search.from
})
export const primaryOptionsWithoutDuplicates = []

primaryOptions.map(option => {
    if(primaryOptionsWithoutDuplicates.includes(option)){
        return
    }
    primaryOptionsWithoutDuplicates.push(option)
})


