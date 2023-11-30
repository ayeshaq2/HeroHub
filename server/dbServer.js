const mysql = require('mysql')
const dotenv = require('dotenv').config(); 

let instance = null;

//connection parametes
const connection = mysql.createConnection({
    //host: process.env.HOST, 
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
    console.log('db' + connection.state); 
});

//performing operations with database
class DBService{
    static getDBServiceInstance(){
        return instance ? instance : new DBService();
    }

    async searchByName(name){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM superheroes WHERE name = ? ;";

                connection.query(query, [name], (err,results)=>{
                    if (err){
                        reject(new Error(err.message));
                    }
                    resolve(results);
                })
            
            });
            return response;
        }catch (error){
            console.log(error); 
        }

    }
    async publisherSearch(publisher){
        try{
            return new Promise((resolve, reject)=>{
                const query = "SELECT * FROM superheroes WHERE publisher = ? ;";

                connection.query(query, [publisher], (err,results)=>{
                    if (err){
                        reject(new Error(err.message));
                    }
                    resolve(results);
                })
            
            });
            
        }catch (error){
            console.log(error); 
        }

    }
    async raceSearch(race){
        try{
            return new Promise((resolve,reject)=>{
                const query = "SELECT * FROM superheroes WHERE race = ? ;";
                connection.query(query,[race],(err,results)=>{
                    if (err){
                        reject(new Error(err.message));
                    }
                    resolve(results);

                })
            })
           
        }catch (error){
            console.log(error); 
        }
    }
    async powerSearch(power){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = `SELECT * FROM superheroes WHERE powers LIKE '%${power}%' ;`;
                
                connection.query(query,[power],(err,result)=>{
                    if(err){
                        reject(new Error (err.message));
                    }
                    resolve(result)

                })

            })
            return response;
        }catch(error){
            console.log(error);
        }
    }

    async register(fName, lName, email, username,password){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = `INSERT INTO users (firstName, lastName, email, nickname, password) VALUES ('
                ${fName}', '${lName}', '${email}','${username}', '${password}')`

                connection.query(query, (err, results)=>{
                if(err){
                    console.log('SQL Error:', err)
                    reject(new Error(err.message))
                    return; 
                }
                resolve(results)

            })
            })
            return response
        }catch(error){
            console.log(error)
        }

    }


  




}

module.exports = DBService;
