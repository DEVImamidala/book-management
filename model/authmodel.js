const pool = require('../config/dbconn');

class authmodel{
    async create(user){
    
       
        
            const { BookName,author,Dateofpublish,statusofavailability,price,description} = user;
            const query ='INSERT INTO bookdetails (BookName,author,Dateofpublish,statusofavailability,price,description) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';

            const values = [BookName,author,Dateofpublish,statusofavailability,price,description];
            console.log(values);
      
    
            const { rows } =await pool.query(query,values);
    
            return rows[0];
                    }

    async read() {
        const query = 'SELECT * FROM bookdetails';
        const { rows } = await pool.query(query);
                return rows;
            }
    async readtwo() {
        const query = 'SELECT id,BookName FROM bookdetails';
        const { rows } = await pool.query(query);
                return rows;
            }

async readauthor({author}){
        console.log('hello');
        // const [author ] = user ;
      
        const query = 'SELECT BookName from bookdetails where author = $1';
        
        try{
        const { rows } = await pool.query(query,[author]);
       
        return rows;
    }
    catch(error){
        console.error(error);
        throw error;

    }
}
    async readid({id}){
        console.log('hello');
       
      
        const query = 'SELECT * from bookdetails where id = $1';
        
        try{
        const { rows } = await pool.query(query,[id]);
       
        return rows.length>0 ? rows[0] : 'id not available';
    }
    catch(error){
        console.error(error);
        throw error;

    }


    
       
    }
    async readdate({dateofpublish}){
        console.log('hello');
      
      
        const query = 'SELECT * from bookdetails where dateofpublish = $1';
        
        try{
        const { rows } = await pool.query(query,[dateofpublish]);
       
        return rows
    }
    catch(error){
        console.error(error);
        throw error;

    }
}
    async readprice({price}){
        console.log('hello');
       
      
        const query = 'SELECT * from bookdetails where price = $1';
        
        try{
        const { rows } = await pool.query(query,[price]);
        return rows
       
       
    }
    catch(error){
        console.error(error);
        throw error;

    }


}
async readstatus(soa){
    console.log('hello');
    const { statusofavailability } = soa ;
  
    const query = 'SELECT BookName from bookdetails where  statusofavailability = $1';
    const values = [statusofavailability];
    // console.log(values)
    const { rows } = await pool.query(query,values);
    return rows;
    
   


}
async update(id, user) {
    const { BookName, author, Dateofpublish, statusofavailability, price, description } = user;
    const query = 'UPDATE bookdetails SET BookName=$1, author=$2, Dateofpublish=$3, statusofavailability=$4, price=$5, description=$6 WHERE id=$7 RETURNING *';
    const values = [BookName, author, Dateofpublish, statusofavailability, price, description, parseInt(id)];  // Convert id to integer
    const { rows } = await pool.query(query, values);
    return rows;
}
// async updatebookname(id,user)
// {
//     const BookName = user;
//     const query = 'UPDATE bookdetails SET BookName = $1 WHERE id = $2';

//     const values = [BookName,id];
//     const { rows } = await pool.query(query,values);
//     return rows;
// }
async  updateone({id,user}) {
    const {BookName} = user;
   
   
        const query = 'UPDATE bookdetails SET BookName = $1 WHERE id = $2 RETURNING *';
        const values = [BookName, id];
        // console.log(values);return;
        const {rows} = await pool.query(query, values);
        return rows[0]; // Assuming you want to return the updated row
  
}


async updateany({ id, user }) {
    try {
        const { author, price, dateofpublish, description } = user;

        let query;
        let values;

        if (author) {
            query = 'UPDATE bookdetails SET author = $1 WHERE id = $2 RETURNING *';
            values = [author, id];
        } else if (price) {
            query = 'UPDATE bookdetails SET price = $1 WHERE id = $2 RETURNING *';
            values = [price, id];
        } else if (dateofpublish) {
            query = 'UPDATE bookdetails SET dateofpublish = $1 WHERE id = $2 RETURNING *';
            values = [dateofpublish, id];
        } else if (description) {
            query = 'UPDATE bookdetails SET description = $1 WHERE id = $2 RETURNING *';
            values = [description, id];
        } else {
            throw new Error('Invalid parameters');
        }

        const { rows } = await pool.query(query, values);
        return rows[0]; // Assuming you want to return the updated row
    } catch (error) {
        console.error('Database query error:', error);
        throw new Error('Error executing database query');
    }
}







 
async deleteall(id){
   
    const query = 'delete from bookdetails where id = $1  RETURNING *';
    const values = [id];
    const { rows }= await pool.query(query,values);
    return rows;
}
// async getid(user) {
//     const query = 'SELECT * FROM bookdetails WHERE id = $1 OR BookName = $2';

//     try {
//         // Convert the value to integer if it's present
//         const idValue = user.id ? parseInt(user.id) : null;

//         const values = [idValue, user.BookName];
//         console.log('Query Values:', values); // Log the query values

//         const result = await pool.query(query, values);
//         console.log('Query Result:', result.rows); // Log the query result

//         return result.rows;
//     } catch (error) {
//         console.error('Database query error:', error); // Log the detailed error
//         throw new Error('Error executing database query');
//     }






// async getid(user) {
//     try {
//         let query;
//         let values;

//         if (user.id) {
//             query = 'SELECT * FROM bookdetails WHERE id = $1';
//             values = [parseInt(user.id)];
//         } else if (user.BookName) {
//             query = 'SELECT * FROM bookdetails WHERE BookName = $1';
//             values = [user.BookName];
//         } else {
//             throw new Error('Invalid parameters');
//         }

//         console.log('Query Values:', values); // Log the query values

//         const result = await pool.query(query, values);
//         console.log('Query Result:', result.rows); // Log the query result

//         return result.rows;
//     } catch (error) {
//         console.error('Database query error:', error); // Log the detailed error
//         throw new Error('Error executing database query');
//     }
// }







 // Make sure to replace '<your-pool-module>' with the actual module you use for connecting to the database


  
}

module.exports = authmodel;


























  
    


    
    module.exports = new authmodel();
  
        
    


