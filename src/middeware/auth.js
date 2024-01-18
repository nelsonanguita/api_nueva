const jwt = require('jsonwebtoken');
const axios = require('axios')

//authenticateToken

const auth =  (req, res, next) => {
  console.log('PASOOOOOOOO MIDD1')

    const token = req.headers['x-access-token']
    //const token = authHeader && authHeader.split(' ')[1]
    
    if (!token) return res.sendStatus(401).json({message:'No token provided'})

    jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {

      if (err) return res.sendStatus(403).json({message:'Invalid token'})
          req.user = user


      console.log('PASOOOOOOOO MIDD2')
      next()
    })

  }



  
const getToken =  async(req,res, next)=>{
   
  try {
      const result = await axios({
          'method': 'POST',
          'url': 'https://api.nubox.com/nubox.api/autenticar',
          'headers': {
              'Authorization': 'Basic YXBpOmFwaQ=='
            }
        });
       
      const token = result.headers['token'];
      console.log(token)
      process.env.API_TOKEN = token;
      //res.send(token)
      next()
  } catch (error) {
    //  console.log(error);
    if (error.response) {
      // La solicitud fue realizada y el servidor respondió con un código de estado diferente de 2xx
      console.error('Respuesta del servidor:', error.response);
    } else if (error.request) {
      // La solicitud fue realizada pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor');
    } else {
      // Algo más salió mal
      console.error('Error al realizar la solicitud:', error.message);
    }

  }
  
 // Usuario: K7byeaLE7Crt

 // Pass: XKuXECnD
}

module.exports = getToken;
