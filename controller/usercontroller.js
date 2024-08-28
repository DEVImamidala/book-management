const usermodel = require('../model/usermodel');
const authmodel = require('../model/authmodel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'your-secret-key';
class usercontroller{
    async insert(req,res){
        // console.log('hello');
        const user = req.body;
        try{
            const users = await usermodel.insert(user);
            // const name = users.username;
            // const email =users.email;
            // const phnnumber = users.phnnumber;
            // console.log(users);return;
            res.status(200).json({status:1,message:'user registered sucessfully',users });


//             const users = await usermodel.insert(user);
// const { username, email, phnnumber } = users;
// // Omitting password from the response for security reasons
// const { password, ...userDetails } = users;

// res.status(400).json({ status: 1, message: 'User details created successfully', user: userDetails });

        }
        catch(error){
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error'})
        }
    }
async login(req, res) {
        const users = req.body;
        console.log(users);
    
        try {
            // console.log('hello');
          const user = await usermodel.login(users);
        // console.log(user);return;
          if (!user) {
            res.status(401).json({ error: 'Invalid details' });
            return;
          }
    
          // Check if the entered password matches the hashed password in the database
        
        const passwordMatch = await bcrypt.compare(users.password, user.password);
    
          if (passwordMatch) {
            const token = jwt.sign({ userId: user.id, username: user.username }, 'your-secret-key', {
              expiresIn: '24h', // Token expires in 4 hours, adjust as needed
            });
    
            res.json({ user, token });
          } else {
            res.status(401).json({ error: 'Invalid credentials' });
          }
        } catch (error) {
          console.error('Error during login:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }



async profile(req, res) {
        const token = req.headers['authorization'];
        
        if (!token) {
          return res.status(401).json({ message: 'Authorization header missing' });
        }
      
        try {
          // Verify the token
          const decoded = jwt.verify(token, SECRET_KEY);
          const username = decoded.username;
      
          // Retrieve user information from the PostgreSQL database
        //   if(username){
          const user = await usermodel.profile(username);
          // if(username){

          
      //     const token = jwt.sign({username:user.username}, 'your-seret-key', {
      //       expiresIn:'24h',
      //     });
      //     res.json({ username, token });
      //   } else {
      //     res.status(401).json({ error: 'Invalid credentials' });
      //  }
         const book = await authmodel.readtwo();
          const username1 = user.username;
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          res.status(200).json({ username1 ,message:'bookdetails',book});
        } catch (error) {
          if (error.username === 'TokenExpiredError') {
            // Handle token expiration error
            res.status(401).json({ message: 'Token expired' });
          } else {
            console.error('Error fetching profile:', error);
            res.status(401).json({ message: 'Invalid token' });
          }
        }
      }


      async getid(req, res) {
        // const token = req.headers['authorization'];
    
        // if (!token) {
        //     return res.status(401).json({ message: 'Authorization header missing' });
        // }
    
        // try {
        //     // Verify the token
        //     const decoded = jwt.verify(token, SECRET_KEY);
        //     // const username = decoded.username;
            const user = req.body;
    
            if (user.id || user.BookName) {
                try {
                    const users = await usermodel.getid(user);
    
                    if (users.length > 0) {
                        const userObj = users[0];
                        res.status(200).json({ status: 1, message: 'Details of entered book:', userObj });
                        // const token 
                    } else {
                        res.status(404).json({ status: 0, message: 'Book not found statusofavailabilityis false pls take another book' });
                    }
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ status: 0, message: 'Internal server error' });
                }
            } else {
                res.status(400).json({ status: 0, message: 'Please enter related details' });
            }
        // } catch (error) {
        //     if (error.name === 'TokenExpiredError') {
        //         // Handle token expiration error
        //         res.status(401).json({ message: 'Token expired' });
        //     } else {
        //         console.error('Error fetching profile:', error);
        //         res.status(401).json({ message: 'Invalid token' });
        //     }
        }
    }
    


module.exports = new usercontroller;