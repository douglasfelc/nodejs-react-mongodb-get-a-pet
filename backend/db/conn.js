const mongoose = require('mongoose')

async function main(){
  await mongoose.connect('mongodb://db:27017/getapet', 
  {
    authSource: "admin",
    user: "nodeauth",
    pass: "nodeauth",
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log("Mongoose connected!")
}

main().catch((err) => console.log(err))

module.exports = mongoose
