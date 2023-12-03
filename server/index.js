const express = require('express');
const mysql = require('mysql')
const path = require('path');
const cors = require('cors');
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const dev = process.env.NODE_ENV !== 'production'
//const handle = app.getRequestHandler()
const cookieP = require('cookie-parser')
const dotenv = require('dotenv').config({path:'./.env'});
const app = express()
const bodyParser = require('body-parser');
const port = 3001;
const router = express.Router();
const jwt = require('jsonwebtoken')

app.use(cookieP())
app.use(bodyParser.json());//middle ware to parse data to json as post request keeps returnign undefined
const DBService = require('./dbServer');
app.use(cors({credentials:true, origin:'http://localhost:3000'}));

//connection parametes
const connection = mysql.createConnection({
    host: process.env.HOST, 
    user: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT

})


//connecting to our database 
connection.connect((err)=>{
    if(err){
        console.log(err.message);
    }
    console.log(process.env.DB_USERNAME)
    
    console.log('db ' + connection.state); 
});


//creating token
const maxAge = 24*60*60;
const createToken = (user) =>{
    return jwt.sign({user}, `'${process.env.JWT_SECRET}'`,{
        expiresIn:maxAge
    })

}


app.get("/api/home",(req,res)=>{
    console.log("enteres")
    res.json({message:"heloo"})
    connection.connect((err)=>{
        if(err){
            console.log(err.message);
        }
        console.log('db' + connection.state); 
    });
})

//getting the superheroes based on given name:
app.get('/search/:option/:value', async (request, response)=>{
    
    const {option,value}  = request.params;
    console.log("got a search", value, option)
    const db =  DBService.getDBServiceInstance();
    let result;
    
    switch(option){
        case 'Name':
            result= db.searchByName(value)
            break;
        case 'Race':
            result= db.raceSearch(value)
            break;
        case 'Publisher':
            result=db.publisherSearch(value)
            break;
        case 'Power':
            result= db.powerSearch(value)
            break;
        default:
            response.status(400).json({error:'Invalid search option'})
            return

    }

    try{
        const data=await result;
        response.status(200).json({data})
        console.log("success")
        console.log(data)
    }catch(err){
        console.error(err)
        console.log(data)
        response.status(500).json({error:"Internal error"})
    }

})

app.post('/add/:username', async(request, response)=>{
    const {username} = request.params;
    const {fName, lName,email,password} = request.body;

    const db = DBService.getDBServiceInstance();
    let hashedpass = bcrypt.hash(password.toString(), 10)
    const result = db.register(fName, lName, email, username, hashedpass)

    result
    .then(data=>response.json({succes:true}))
    .catch(err=>{
        console.log(err)
    })

})

//creates an otp which is sent to the user and stored in the database
app.post('/send/:username', async(request, response)=>{
    const {username} = request.params;
    const {email, otp} = request.body;
    console.log("send index", request.body)


    let subject="Verification OTP";
    let message="Here's your verification code:"

    const transporter = nodemailer.createTransport({
        service:'gmail',
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth: {
            type:"login",
            user: process.env.EMAIL_ID,
            pass: process.env.EMAILL_PASS
        }
    })

    try{

        // console.log(process.env.EMAIL_ID)
        // console.log(process.env.EMAIL_PASS)
        // console.log(email)

        //let hashedOtp = bcrypt.hash(otp.toString(), 10)
        const db = DBService.getDBServiceInstance()
        const result = db.addOTP(username,otp)

        result
        .then(data=>response.json({success:true}))
        .catch(err=>{
            console.log(err)
        })

        

        // const mailOption={
        //     from: 'ecenetworking4436@gmail.com',
        //     to: email,
        //     subject: `HeroHub: ${subject}`,
        //     html:`
        //     <h3> HeroHub: Verification</h3>
        //     ${message} ${otp1}`
        // }

        // transporter.sendMail(mailOption, (error, info)=>{
        //     if(error){
        //         console.error('Error sneinf', error)
        //     }else{
        //         console.log('eamil send', info.response)
        //     }
        // })

    }catch(err){
        console.log(err)
    }

})

//sending otp taking email instead of username:
app.post('/send-mail/:email', async(request, response)=>{
    const {email} = request.params;
    const {otp} = request.body;
    console.log("send index", request.body)

    try{

        //let hashedOtp = bcrypt.hash(otp.toString(), 10)
        const db = DBService.getDBServiceInstance()
        const result = db.addOTP(email,otp)

        result
        .then(data=>response.json({success:true}))
        .catch(err=>{
            console.log(err)
        })

        

    }catch(err){
        console.log(err)
    }

})

//retrieves the hashed otp for a user to be verified
app.post('/verify', async(request, response)=>{
    try{
    const {email, pin} = request.body
    console.log(email)
    const db = DBService.getDBServiceInstance()

    const storedOTP = await db.getOTP(email)
    console.log("index",request.body)
    console.log("from database",storedOTP)
    console.log("pin", typeof(pin))

    if(!storedOTP){
        return response.status(404).json({success:false, error:"OTP not found"})
    }

    const isMatch = storedOTP == pin

    if(isMatch){
        return response.json({success:true})
    }else{
        return response.status(403).json({success:false, error:"Incorrect OTP"})
    }
}catch(err){
    console.log(err)
}
    

})

//logging in functionality:
app.post('/login/:email', async(request, response)=>{
    try{
        const {email} = request.params
        const {inputPass} = request.body
        const db = DBService.getDBServiceInstance();
        const result = await db.login(email);
        console.log(result)

        console.log('stored pass', result[0].password)
        console.log('input pass', inputPass)

        const isMatch = bcrypt.compare((result[0].password),inputPass)

        if(isMatch){
            console.log("pass match")
            const token = createToken(email)
            response.cookie('jwt', token, {httpOnly:true, maxAge: maxAge*1000})
            return response.json({success:true})
            
            //take them to home page where they have logged in 
        }else{
            
            return response.status(403).json({success:false, error:"Incorrect Password"})
        }
    }catch(err){
        console.log(err)
    }

})

//function that verifies if an email exists or not
app.get('/email-check/:email', async(request, response)=>{
    try{
        const { email } = request.params
        console.log('api rec', email)
        const db = DBService.getDBServiceInstance()
        const result = await db.emailExists(email)
        console.log(result.length)

        if(result.length>0){
            response.json({exists:true})
        }else{
            response.json({exists:false})
        }
    }catch(err){
        console.log(err);
        response.status(500).json({error:'Internal server error'})
    }
})

//endpoint that gets the status of the user email:
app.get('/verified/:email', async(request, response)=>{
    try{
        const {email} = request.params
        const db = DBService.getDBServiceInstance()
        const result = await db.verified(email)
        console.log('verification status', result)


        const isMatch = result[0].verified == 'yes'

        if(isMatch){
            return response.json({success:true})
        }else{
            response.status(403).json({success:false, error:"Incorrect"})

        }

    }catch(err){
        console.log(err)
    }

})

//function that find the username and changes the password:
app.post('/update/:username', async(request, response)=>{
    try{
        const {username} = request.params
        const {newpassword} = request.body

        const db = DBService.getDBServiceInstance()

        const result = db.changePassword(username, newpassword);

        result
        .then(data=>response.json({success:true}))
        .catch(err=>{
            console.log(err)
        })
    }catch(err){
        console.log(err)
    }
})

app.get(logout){
    //setting up the process to log out (delete cookie) -- FIX THIS
    response.cookie('jwt', '', {maxAge:1});
    response.redirect('/page') //return to home page
}

//checking a current logged in user
app.checkUser{
    const token = request.cookies.jwt
    if(token){
        //if token exists, verify it

        jwt.verify(token, process.env.JWT_SECRET, async (err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user=null
                // resposne.redirect('login')
            }else{
                console.log(decodedToken)
                //valid user logged in
                let user = await db.finduser(decodedToken.email)
                response.locals.user = user
                next()
            }
        })

    }else{
        res.locals.user=null
        next() //move on
    }

}




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