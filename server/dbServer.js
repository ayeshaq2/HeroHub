const { list } = require('@chakra-ui/react');
const mysql = require('mysql');
const { resolveContent } = require('nodemailer/lib/shared');
const dotenv = require('dotenv').config(); 

let instance = null;

//connection parametes
const connection = mysql.createConnection({
    //host: process.env.HOST, 
    user: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    multipleStatements:true

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

    async multiSearch(searchCriteria){
        try{
            let query = `SELECT * FROM superheroes WHERE 1=1 `

            if(searchCriteria.heroName){
                query += `AND name LIKE '%${searchCriteria.heroName}%' `

            }
            if(searchCriteria.race){
                query += `AND race LIKE '%${searchCriteria.race}%' `

            }
            if(searchCriteria.publisher){
                query += `AND publisher LIKE '%${searchCriteria.publisher}%' `

            }
            if(searchCriteria.power){
                query += `AND powers LIKE '%${searchCriteria.power}%' `

            }
            const response = await new Promise((resolve, reject)=>{
                connection.query(query, (err,results)=>{
                    if(err){
                        reject(new Error(err.message))
                        return;

                    }
                    resolve(results)
                    //console.log(results)
                })
            })
            return response
            
        }catch(err){
            console.log(err)
        }
    }

    async getAll(){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = 'SELECT * FROM superheroes;'
                connection.query(query, (err,results)=>{
                    if(err){
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

    async searchByName(name){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM superheroes WHERE name LIKE ? ;";

                connection.query(query, [`%${name}%`], (err,results)=>{
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
                const query = "SELECT * FROM superheroes WHERE publisher LIKE ? ;";

                connection.query(query, [`${publisher}`], (err,results)=>{
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
                const query = "SELECT * FROM superheroes WHERE race LIKE ? ;";
                connection.query(query,[`${race}`],(err,results)=>{
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
    async addOTP(email, otp){
    
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = `UPDATE users SET otp = '${otp}' WHERE email = '${email}';`

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

    async getOTP(email){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = `SELECT otp FROM users WHERE email = '${email}'`
                const query2 = `UPDATE users SET verified = 'yes' WHERE email = '${email}'`
                connection.query(query, (err,results)=>{
                   // console.log(results)
                    if(err){
                        console.log('SQL ERROR:',err)
                        reject(new Error(err.message))
                        return
                    }
                    if(results.length>0){
                        const otpVal = results[0].otp
                        console.log(results)
                        resolve(otpVal)
                        //console.log("thisss", typeof(otpVal))

                        connection.query(query2, (err,results)=>{
                            if(err){
                                console.log(err)
                            }else{
                                console.log("updated:", results)
                            }
                        })
                    }else{
                        resolve(null)
                    }})
            })
            return response
        }catch(err){
            console.log(err)
        }
    }

    //chnages password
    async changePassword(email, password){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = `UPDATE users SET password = '${password}' WHERE email = '${email}';`
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

    async login(email){
        try{const response = await new Promise((resolve, reject)=>{
            const query = `SELECT password FROM users WHERE email = '${email}';`
            connection.query(query, (err, results)=>{
                if(err){
                    console.log("SQL error:", err)
                        reject(new Error(err.message))
                        return
                }
                resolve(results)
                //console.log(results)

            })
        })
        return response

        }catch(err){
            console.log(err)
        }
    }

    async statusCheck(email){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = `SELECT status FROM users WHERE email = '${email}' ;`
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

    //method that will return the heroes and its information for the list
    async getListHeroes(listName, username){
       // console.log('thename',listName, username)
        try{
            const response = await new Promise((resolve,reject)=>{
                // const query = `SELECT superheroes.* FROM superheroes JOIN publiclists ON JSON_CONTAINS(publiclists.heroes, JSON_ARRAY(superheroes.name)) WHERE publiclists.name = '${listName}'`
                const query=`SELECT superheroes.*
                FROM superheroes
                LEFT JOIN publiclists ON publiclists.name = '${listName}' AND publiclists.user = '${username}' AND JSON_CONTAINS(publiclists.heroes, JSON_ARRAY(superheroes.name))
                LEFT JOIN privatelists ON privatelists.name = '${listName}' AND privatelists.user = '${username}' AND JSON_CONTAINS(privatelists.heroes, JSON_ARRAY(superheroes.name))
                WHERE (publiclists.name IS NOT NULL AND publiclists.user IS NOT NULL) OR (privatelists.name IS NOT NULL AND privatelists.user IS NOT NULL);
                `
                connection.query(query, (err,results)=>{
                    if(err){
                        console.log("SQL Error:", err)
                        reject (new Error(err.message))
                        return
                    }
                    resolve(results)
                    //console.log(results)
                })
                
            })
            return response 
        }catch(err){
            console.log(err)
        }
    }

    

    async findUser(email){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = `SELECT * FROM users WHERE email = '${email}'`
                connection.query(query, (err,results)=>{
                    if(err){
                        console.log("SQL Error:", err)
                        reject (new Error(err.message))
                        return
                    }
                    resolve(results[0])
                    //console.log(results)
                })
            })
            return response
        }catch(err){
            console.log(err)
        }
    }

    async getLists(){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = `SELECT * FROM publiclists;`
                connection.query(query, (err,results)=>{
                    if(err){
                        console.log("SQL Error:", err)
                        reject (new Error(err.message))
                        return
                    }
                    resolve(results)
                    //console.log(results)
                    
                })
            })
            return response
        }catch(err){
            console.log(err)
        }
    }

    async getallLists(username){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = `SELECT name, user, heroes, time FROM publiclists WHERE user = '${username}' UNION SELECT name, user, heroes, time FROM privatelists WHERE user = '${username}';`
                connection.query(query, (err,results)=>{
                    if(err){
                        console.log("SQL Error:", err)
                        reject (new Error(err.message))
                        return
                    }
                    resolve(results)
                    //console.log(results)
                    
                })
            })
            return response
        }catch(err){
            console.log(err)
        }
    }


    //adding a hero to a (public) list
    async addToList(listName, hero){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = `UPDATE publiclists SET heroes = JSON_ARRAY_APPEND(IFNULL(heroes, '[]'), '$', ?) WHERE name = ?;`
                connection.query(query,[hero,listName], (err,results)=>{
                    if(err){
                        console.log("SQL Error:", err)
                        reject (new Error(err.message))
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

    async addComment(listName, comment){
        //console.log(comment)
        //console.log(listName)
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = `UPDATE publiclists SET comments = JSON_ARRAY_APPEND(IFNULL(comments, '[]'), '$', ?)  WHERE name = ?;`
                connection.query(query,[comment,listName], (err,results)=>{
                    if(err){
                        console.log("SQL Error:", err)
                        reject (new Error(err.message))
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

    async createList(listName, username, time){
        try{
            const response = await new Promise ((resolve,reject)=>{
                const query = `INSERT INTO publiclists(name,user,time) VALUES ('${listName}', '${username}', '${time}');`
                connection.query(query,(err,results)=>{
                    if(err){
                        console.log("SQL Error:", err)
                        reject (new Error(err.message))
                        return

                    }
                    resolve(results) 
                })
            })
            return(response)
        }catch(err){
            console.log(err)
        }
    }

    //for private list:
    async createList2(listName, username, time){
        try{
            const response = await new Promise ((resolve,reject)=>{
                const query = `INSERT INTO privatelists(name,user,time) VALUES ('${listName}', '${username}', '${time}');`
                connection.query(query,(err,results)=>{
                    if(err){
                        console.log("SQL Error:", err)
                        reject (new Error(err.message))
                        return
                    }
                    resolve(results) 
                })
            })
            return(response)
        }catch(err){
            console.log(err)
        }
    }

    async getComments(listName){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = `SELECT JSON_ARRAY(comments) FROM publiclists WHERE name = '${listName}'; `
                connection.query(query, (err,results)=>{
                    if(err){
                        console.log("SQL Error:", err)
                        reject (new Error(err.message))
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

    async deleteList(listName){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query=`DELETE FROM publiclists WHERE name = '${listName}'; `
                connection.query(query, (err,results)=>{
                    if(err){
                        console.log("SQL Error:", err)
                        reject (new Error(err.message))
                        return
                    }
                    resolve(results)
                })
            })
            return response
        }catch (err){
            console.log(err)
        }
    }

    // In your database service
async deleteHeroFromList(listName, heroName) {
    //console.log("del", listName)
    //console.log("del", heroName)
    
    try {
        const response = await new Promise((resolve, reject)=>{
            const query = `UPDATE publiclists SET heroes = JSON_REMOVE(heroes, JSON_UNQUOTE(JSON_SEARCH(heroes, 'one', ?))) WHERE name = ?`;
            const params = [heroName, listName];
            connection.query(query, params, (err,result)=>{
                    if(err){
                    console.log("SQL Error:", err)
                    reject (new Error(err.message))
                    return
        }
        resolve(result)
      });

    })
    return response
    } catch (error) {
      console.error('Database Error:', error);
      throw error;
    }
  }

  //gets all the users for admin
  async getAllUsers(){
    try{
        const response = await new Promise((resolve,reject)=>{
            const query = `SELECT * FROM users;`
            connection.query(query, (err,results)=>{
                if(err){
                    console.log("SQL Error:", err)
                    reject (new Error(err.message))
                    return
                }
                resolve(results)
                // console.log(results)
            })
        })
        return response;
    }catch(err){
        console.log(err)
    }
  }
  
  //sets account to deactivate
  async deactivate(email){
    //console.log(email)
    try{
        const response = await new Promise((resolve,reject)=>{
            const query = `UPDATE users SET status ='no' WHERE email = '${email}'; `
            connection.query(query, (err, results)=>{
                if(err){
                    console.log("SQL Error:", err)
                    reject (new Error(err.message))
                    return
                }
                resolve(results)
            })
        })
        //console.log(response)
        return response
        
    }catch(err){
        console.log(err)
    }}

    //gives account admin status
    async status(email){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = `UPDATE users SET account ='admin' WHERE email = '${email}'; `
                connection.query(query, (err, results)=>{
                    if(err){
                        console.log("SQL Error:", err)
                        reject (new Error(err.message))
                        return
                    }
                    resolve(results)
                })
            })
            return response
        }catch(err){
            console.log(err)
        }}

        //gets the policy from the database
        async getPolicy(policyName){
            try{
                const response = await new Promise((resolve, reject)=>{
                    const query = `SELECT policyText FROM policies WHERE policyName = '${policyName}';`
                    connection.query(query, (err, results)=>{
                        if(err){
                            console.log("SQL Error:", err)
                            reject (new Error(err.message))
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

        //updates and adds policy to database
        async updatePolicy(policyName, policyText){
            //console.log('update', policyName)
            try{
                const response = await new Promise((resolve,reject)=>{
                    const query = `UPDATE policies SET policyText = '${policyText}' WHERE policyName = '${policyName}';`
                    connection.query(query, (err, results)=>{
                        if(err){
                            console.log("SQL Error:", err)
                            reject (new Error(err.message))
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

        async makePublic(listName, username){
            //console.log('entereeeeee')
            try{
                const response = await new Promise((resolve, reject)=>{
                    const query = `
                            IF EXISTS (SELECT 1 FROM privatelists WHERE name = ${listName} AND user = ${username})
                            BEGIN
                                -- Move the list to publiclists
                                INSERT INTO publiclists (name, user, heroes)
                                SELECT name, user, heroes FROM privatelists WHERE name = ${listName} AND user = ${username};

                                -- Delete the list from privatelists
                                DELETE FROM privatelists WHERE name = ${listName} AND user = ${username};

                                SELECT 'List moved from private to public' AS Result;
                            END
                            ELSE
                            BEGIN
                                SELECT 'List does not exist in private lists' AS Result;
                            END;
                    
                    `

                    connection.query(query, (err, results)=>{
                        if(err){
                            console.log("SQL Error:", err)
                            reject (new Error(err.message))
                            return
                        }
                        resolve(results)
                    })
                    
                })
                return response;
            }catch(err){
                console.log(err)
            }
        }

}



module.exports = DBService;
