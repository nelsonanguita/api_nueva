const {Router} = require('express')
const router = Router();
const jwt = require('jsonwebtoken');


//routes
router.get('/', (req, res)=>{
    //authenticateToken
    res.json({ message: 'You are authorized to access this protected resource.' });
})







function authenticateToken(req, res, next) {
 
    const token = req.headers['x-access-token']
    console.log(token)
    //const token = authHeader && authHeader.split(' ')[1]
    
    if (!token) return res.sendStatus(401).json({message:'No token provided'})

    jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {

      if (err) return res.sendStatus(403).json({message:'Invalid token'})
      console.log('llega aqui?')

      console.log(user)
      req.user = user
      next()
    })
  }



module.exports = router