const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')
connectToMongo()
const app = express();
const port = 5000

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

//available rouest
app.use('/routes/auth',require('./routes/auth'))
app.use('/routes/notes',require('./routes/notes'))

app.get('/',(req,res)=>{
    res.send('Hello world')
})
app.listen(port,()=>{
    console.log(`iNoteBook is listening at ${port}`)
})