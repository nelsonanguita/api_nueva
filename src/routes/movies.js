//const router = require('express').Router();
//const router = Router()

const movies  = require('../BD/databade.json')

//routes

const getDatos = (req, res)=>{
    res.json(movies)
}



const getMovies = (req, res)=>{
    res.json({'llega':'sssi'})
}



module.exports = {getDatos, getMovies};

//export = datos