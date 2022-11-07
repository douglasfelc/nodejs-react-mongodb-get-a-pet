const mongoose = require('mongoose')

async function main(){
  await mongoose.connect('mongodb://localhost:27017/getapet', 
  {
    authSource: "admin",
    user: "nodeauth",
    pass: "nodeauth",
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log("Conectou ao Mongoose!")
}

main().catch((err) => console.log(err))

module.exports = mongoose
