const authmodel = require('../model/authmodel');
class authController{
    async create(req,res){
        const user = req.body;
        try
        {
             const users = await authmodel.create(user);
             res.status(400).json({status:1,message:' book details created successfully',users});
        }
        catch (error)
        {
        console.error('error registration  user:',error);
        res.status(500).json({ error: 'Internal Server Error'});
        }
}
async read(req,res){
    console.log('hello');
    // const user = req.body;
    try{
        const users = await authmodel.read();
        res.status(400).json({status:1,message:'details of all in bookmanagement',users});
    }
    catch(error){
        console.error(error);
        res.status(500).json({status:0,message:'not getting data'});
    }
}
 async readauthor(req,res){
    const author = req.params.author;
    try{
        const bookname = await authmodel.readauthor({author});
        res.status(200).json({ status: 1, message: 'Author books are', bookname:{bookname}});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
 }
 async readid(req,res){
    const id = req.params.id;
    try{
        const details= await authmodel.readid({id});
        res.status(200).json({ status: 1, message: 'book details of',details});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
 }
 async readdate(req,res){
    const dateofpublish = req.params.dateofpublish;
    try{
        const datebooks= await authmodel.readdate({dateofpublish});
        res.status(200).json({ status: 1, message: 'date of book publish is',datebooks});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
 }
 async readprice(req,res){
    const price = req.params.price;
    try{
        const bookprice= await authmodel.readprice({price});
        res.status(200).json({ status: 1, message: 'date of book publish is',bookprice});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
 }
 async readstatus(req,res){
    // console.log('hello');
    const soa = req.body;
    try{
        const bookstatus= await authmodel.readstatus(soa);
        res.status(200).json({ status: 1, message: 'availability of book',bookstatus});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
 }
 async update(req,res){
    const user = req.body;
    const id = req.params.id;

    try{
        const users = await authmodel.update(id,user);
        res.status(200).json({status:1,message:'updation successfull',users});
    }
    catch(error){
        console.error(error);
        res.status(400).json({status:0,message:'update not happening'});
    }
 }

async updateone(req, res) {
   
    const id = req.params.id;
    const user= req.body;
    // console.log(user);return;
    // if(user =={BookName})

    try {
        const updatedUser = await authmodel.updateone({id, user});
        res.status(200).json({ status: 1,   message: 'BookName updated successfully', book: updatedUser  });
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: 0, message: 'Failed to update BookName'  });
    }

}


async updateany(req,res){
    const id = req.params.id;
    const user = req.body;
 
    try{
        if(user.author ||user.dateofpublish || user.statusofavailability || user.description)
    {

        const users = await authmodel.updateany({id,user});
        res.status(200).json({status:1,message:'the above mentioned is updated'});
    }
}
    catch(error){
        console.error(error);
        res.status(400).json({status:0,message:'error occured'});
    }
 }






async deleteall(req,res){
    const id = req.params.id;
    try{
        const users = await authmodel.deleteall(id);
        res.status(200).json({status:1,message:'deleted successfully',users});
    }
    catch(error){
        console.error(error);
        res.status(400).json({status:0,message:'server error'});
    }
}


// async getid(req, res) {
//     const user = req.body;
 
//     if (user.id || user.BookName) {
//         try {
//             const users = await authmodel.getid(user);
//             // console.log(users);
//             res.status(200).json({ status: 1, message: 'Details of entered book:', users });
//         } catch (error) {
//             console.error(error);
//             res.status(400).json({ status: 0, message: 'Internal server error' });
//         }
//     } else {
//         res.status(400).json({ status: 0, message: 'Please enter related details' });
//     }
// }


























// async getid(req, res) {
//     const user = req.params;

//     try {
//         const details = await authmodel.getid(user);
//         console.log(details);

//         if (details.length > 0) {
//             res.status(200).json({ status: 1, message: 'Details of entered book:', details });
//         } else {
//             res.status(404).json({ status: 0, message: 'Book not found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: 0, message: 'Internal server error' });
//     }
// }

    }






 



    
    module.exports = new authController;
