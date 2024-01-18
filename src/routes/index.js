const express = require('express')
const router = express.Router();
const app = express();

const getToken = require('../middeware/auth.js')
require('dotenv').config();
/*
router.get('/', auth,(req, res) => {
    
  res.send('¡Hola, mundo!');
});
*/


const { getMovies, getDatos} = require('./movies.js')
const { getComunas, getPDF } = require('./nublox.js')

router.use(getToken);

router.get('/', getMovies)
router.get('/datos', getDatos)



router.get('/comunas', getComunas)
router.post('/pdf', getPDF)


// route middlewares
//app.use('/', auth);

//const datos = require('./movies.js')

//router.use('/', auth)

//router.use('/', require('./movies'));
/*
router.post('/token', async(req,res)=>{
   

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
        res.send(token)
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
})

router.get('/comunas', async(req, res)=>{
        console.log(process.env.API_TOKEN)
        console.log('process.env.API_TOKEN')
            try {
                const comunas = await axios({
                    'method': 'GET',
                    'url': 'https://api.nubox.com/Nubox.API/factura/comunas',
                    'headers': {
                    'token': process.env.API_TOKEN,
                    'Cookie': '.Stackify.Rum=4c648f24-1d4f-4817-a602-57005e5e24da'
                    }
                });
                // console.log(factura.body);
                res.json(comunas.data);
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

   

    
})

router.get('/pdf',async(req, res)=>{


    try {
        const pdf = axios.get({
            'method': 'POST',
            'url': 'https://api.nubox.com/Nubox.API/factura/1-9/1/productos',
            'headers': {
                'token': process.env.API_TOKEN,
                'Content-Type': 'application/json',
              'Cookie': '.Stackify.Rum=4c648f24-1d4f-4817-a602-57005e5e24da'
            },
            body: JSON.stringify([{"Codigo":"PR0001","Nombre":"Nombre Producto 1","Descripcion":"Descripción Producto 1","Cantidad":20,"Precio":15000,"Inventariable":true},{"Codigo":"PR0002","Nombre":"Nombre Producto 2","Descripcion":"Descripción Producto 2","Cantidad":15,"Precio":23000,"Inventariable":false}])
           

        })

        console.log(pdf)
        res.send(pdf.data)    
    } catch (error) {
         //  console.log(error);
         if (error.response) {
            // La solicitud fue realizada y el servidor respondió con un código de estado diferente de 2xx
            console.error('Respuesta del servidor:', error.response.status);
        } else if (error.request) {
            // La solicitud fue realizada pero no se recibió respuesta
            console.error('No se recibió respuesta del servidor');
        } else {
            // Algo más salió mal
            console.error('Error al realizar la solicitud:', error.message);
        }
    }
    
})
*/

// //routes
// router.use('/',auth, (req, res)=>{
    
//     //res.send( 'You are authorized to access this protected resource.' );

//    res.json({ message: 'You are authorized to access this protected resource.' });
// })


/*

var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://api.nubox.com/nubox.api/autenticar',
  'headers': {
    'Authorization': 'Basic aWM3cFJISjFOUHJkOkZudldRc2VB'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});


*/




function authenticateToken(req, res, next) {
 
    const token = req.headers['x-access-token']
    console.log(token)
    //const token = authHeader && authHeader.split(' ')[1]
    
    if (!token) return res.sendStatus(401).json({message:'No token provided'})

    jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {
        try {
            if (err) return res.sendStatus(403).json({message:'Invalid token'})
            console.log('llega aqui?')

            console.log(user)
            req.user = user
            next()    
        } catch (error) {
            res.send(error)
        }

    })
  }


module.exports = router;