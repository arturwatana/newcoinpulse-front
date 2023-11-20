
const fs = require("fs")

async function getData(){
    const data = await fetch("https://api.binance.com/api/v3/exchangeInfo")
    const json = await data.json()
    const symbols = json.symbols
    const pairs = symbols.map(symbol => {
        return {
            from: symbol.baseAsset,
            to: symbol.quoteAsset,
        }
    })
      fs.writeFile("binance-possible.js", JSON.stringify(pairs), (err) => {
        if(err) {
            console.log(err)
            return
        }
        console.log(`O arquivo binance-possible.js foi criado com sucesso!`);
        })
}