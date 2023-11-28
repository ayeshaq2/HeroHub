const express = require('express');
const mysql = require('mysql')
const path = require('path');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production'
//const handle = app.getRequestHandler()
const app = express()


const dotenv = require('dotenv').config({path:'server/.env'});
const bodyParser = require('body-parser');
const port = 3000;
const router = express.Router();
app.use(bodyParser.json());//middle ware to parse data to json as post request keeps returnign undefined
const DBService = require('./dbServer');
app.use(cors());



app.get("/api/home",(req,res)=>{
    console.log("enteres")
    res.json({message:"heloo"})
})

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})

// app.prepare()
// .then(()=>{
//     const server = express()
//     server.use(bodyParser.json())
//     server.use(bodyParser.urlencoded({extended:true}))

//     //put apis here 

//     server.get('/search/:name', async(request,response)=>{
//         const{name} = request.params;
//         const db = DBService.getDBServiceInstance();
//         const result = db.searchByName(name);

//         result

//         .then(data=>{
//             response.status(200).json({data:data})
//         }).catch(err=>{
//             console.log(err)
//         })
//     })
//     server.listen(port,(err)=>{
//         if(err) throw err
//         console.log("listening on port" `${port}`)
//     })

// })