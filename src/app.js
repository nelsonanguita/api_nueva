const express = require('express');
const app = express();

const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

//setting
app.set('port',process.env.PORT || 3000);
// app.set('json spaces',2);


//moddlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());



//routes
const routes = require('./routes/index.js');
app.use('/api',routes)

//app.use('/api/movies', require('./routes/movies'))
//app.use(require('./routes/movies'))


  function verificaRol(req, res, next)  {

    let rol = req.user.rol;
  
    console.log(rol);
    
    if(rol !== 'ADMIN'){
      return res.status(401).json({
        mensaje: 'Rol no autorizado!'
      })
    }
    
    next();
  
  }



//partiendo el servidor
app.listen(3000, ()=>{
    console.log(`Server is running on port ${3000}`)
})
