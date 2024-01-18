const axios = require('axios')


const getToken =  async(req,res)=>{
   
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
}

const getComunas =  async(req, res)=>{
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

   

    
}

const getPDF = async(req, res)=>{


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
    
}




module.exports  = {getComunas, getPDF, getToken}