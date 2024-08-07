const jwt = require('jsonwebtoken')
const secretKey = "SiddhuIsAGoodBoy$$"
const fetchuser = (req,res,next) =>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Please authenticate with a valid token"})
    }
    try{
        const data = jwt.verify(token,secretKey)
        req.user=data.user
        next()
    }catch{
        res.status(401).send({error:"Please authenticate with a valid token"})
    }
}
module.exports = fetchuser