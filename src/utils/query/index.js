
// const json = require("./json")
// const fs = require('fs');

// const querys = []

// const keys = Object.keys(json)

// const unique = keys.map(key => {
//   const firstKey = key.split("-")[0]

//   const alredyexists = querys.find(key => key.name === firstKey)
//   if(alredyexists) return 
//   querys.push({
//     name: firstKey,
//     possibleSearches: []
//   })

// })

// const onlykeys = keys.map(key => {
//   const firstKey = {
//       name: key.split("-")[0],
//       secondName: key.split("-")[1]
//   }

//   querys.map(query => {
//     if(firstKey.name === query.name){
//       query.possibleSearches.push(firstKey.secondName)
//     }
//   })

// })

// const arqname = "FormattedPossibleSearches.js"

// fs.writeFile(arqname, JSON.stringify(querys), (err) => {
//   if(err) {
//     console.log(err)
//     return
//   }
//   console.log(`O arquivo ${nomeDoArquivo} foi criado com sucesso!`);
// })


