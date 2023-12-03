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

    //adds resgistered user
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

    //adds otp to database for a user
    async addOTP(username, otp){
    
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = `UPDATE users SET otp = '${otp}' WHERE nickname = '${username}';`

                connection.query(query, (err,results)=>{
                    if(err){
                        console.log('SQL error:', err)
                        reject(new Error(err.message))
                        return
                    }
                    resolve(results)

                })
            })
            return response
        }catch(err){
            console.log(err)
        }
    }

    //to check if an email exists
    async emailExists(email){
        console.log("sent,", email)
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = `SELECT * FROM users WHERE email = '${email}' ;`
                connection.query(query,(err,results)=>{
                    if(err){
                        console.log('SQL error:', err)
                        reject(new Error(err.message))
                        return
                    }
                    resolve(results)
                    //console.log('resut', results)
                })

            })
            //console.log("res", response)
            return response
            
        }catch(err){
            console.log(err)
        }
    }

    //to retrieve the verification status of an email account:
    async verified(email){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = `SELECT verified FROM users WHERE email = '${email}';`
                connection.query(query, (err,results)=>{
                    if(err){
                        console.log('SQL error:', err)
                        reject(new Error(err.message))
                        return
                    }
                    resolve(results)
                })
            })
            return response
        }catch(err){
            console.log(err)
        }
    }

    //gets otp from the database for a username

    async getOTP(username){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = `SELECT otp FROM users WHERE nickname = '${username}'`
                const query2 = `UPDATE users SET verified = 'yes' WHERE nickname = '${username}'`
                connection.query(query, (err,results)=>{
                    if(err){
                        console.log('SQL ERROR:',err)
                        reject(new Error(err.message))
                        return
                    }
                    if(results.length>0){
                        const otpVal = results[0].otp
                        resolve(otpVal)
                        console.log("thisss", typeof(otpVal))
                    }else{
                        resolve(null)
                    }
                    // resolve(results)
                    // console.log("this was retunred", typeof(results))
                })

                connection.query(query2, (err,results)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log("updated:", results)
                    }
                })
            })
            return response
        }catch(err){
            console.log(err)
        }
    }

    //chnages password
    async changePassword(username, password){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = `UPDATE users SET password = '${password}' WHERE nickname = '${username}';`
                connection.query(query, (err,results)=>{
                    if(err){
                        console.log("SQL error:", err)
                        reject(new Error(err.message))
                        return
                    }
                    resolve(results)

                })
            })
            return response
        }catch(err){
            console.log(err)
        }
    }

    async login(username){
        try{const response = await new Promise((resolve, reject)=>{
            const query = `SELECT password FROM users WHERE nickname = '${username}';`
            connection.query(query, (err, results)=>{
                if(err){
                    console.log("SQL error:", err)
                        reject(new Error(err.message))
                        return
                }
                resolve(results)

            })
        })
        return response

        }catch(err){
            console.log(err)
        }
    }
}

module.exports = DBService;
