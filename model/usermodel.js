const pool = require('../config/db');
const valid = require('../middleware/authvalidation');
const bcrypt = require('bcrypt');
class usermodel {
    async insert(user) {
        // console.log("hfbsd");return;
        const {username,email,password,phnnumber} = user;
        const ispassword = valid.validatePassword(password);
        const isemail = valid.validateemail(email);
        // const isphnnumber = valid.validatephnnumber(phnnumber);
        // const isusername =valid.validatename(username);
        if(username){
        if(isemail){
            if(ispassword){
                if(phnnumber.length==10){
                    
       
                                try{
                                    const hashedPassword = await bcrypt.hash(password, 10);
        
       
        // console.log('hello');return;
        
        // const query = 'INSERT INTO userregister(username,email,password,phnnumber) VALUES ($1, $2,$3,$4) RETURNING *';
        // const values = [username,email,password,phnnumber];
       
       
        // const { rows } = await pool.query(query, values);
        // return rows[0];
        // }

        //profile
                                // const result = await pool.query(
                                //     'INSERT INTO userregister(username,email,password,phnnumber) VALUES ($1, $2,$3,$4)',
                                //     [username,email, hashedPassword,phnnumber]
                                //     );
                                // // console.log('Register Query:', result.query, 'Values:', [username,email, hashedPassword,phnnumber]);
                                
                                
                                
                                // return result.rows[0];


                                const query = 'INSERT INTO userregister(username,email,password,phnnumber) VALUES ($1, $2, $3, $4) RETURNING *';
                                const values = [username,email, hashedPassword,phnnumber];
                                const { rows } = await pool.query(query, values);
                                return rows[0];
                                }
                                catch (error){
                                    console.log('error registration user:',error);
                                    throw error;
                                }
                            }
                        else{
                            return 'phnnumbernot valid';
                        }

                }
                else{
                    return 'password not valid';
                }
            }

            else{
                return 'email not valid';
            }
        }
        else{
            return 'name is not valid';
        }
} 

    

async login(users) {
        const { username,password } = users;
    
        const query = 'select * from userregister where username=$1';
        const values = [username];
        console.log('Login Query:', query, 'Values:', values);
    
        // try {
            const { rows } = await pool.query(query, values);
            console.log(rows);
    
            if (rows) {
                return rows[0];
            } else {
                return null; // User not found
            }
        // } catch (error) {
        //     console.error('Error during login:', error);
        //     return null;
        // }
    }
    
    
async profile(username) {
        const names = username;
        try {
            const query = 'SELECT * FROM userregister WHERE username = $1';
            const values = [names];
            const result = await pool.query(query, values);
            return result.rows[0]; // Assuming you have a 'users' table
        } catch (error) {
            throw error;
        }
    }



    async getid(user) {
        try {
          let query;
          let values;
    
          if (user.id) {
            console.log('id');
         
            query = 'SELECT * FROM bookdetails WHERE id = $1 and statusofavailability=true';
            values = [parseInt(user.id)];
              
          } else if (user.BookName) {
           console.log('star')
            query = 'SELECT * FROM bookdetails WHERE BookName = $1 and statusofavailability=true ';
          
            values = [user.BookName];
            console.log('hello');
          } else {
            throw new Error('Invalid parameters');
          }
    
          console.log('Query Values:', values);
    
          const result = await pool.query(query, values);
          console.log('Query Result:', result.rows);
    
          return result.rows;
        } catch (error) {
          console.error('Database query error:', error);
          throw new Error('Error executing database query');
        }
      }
    
        // } catch (error) {
        //     console.error('Error during login:', error);
        //     return null;
        // }
    }
    

module.exports = new usermodel;