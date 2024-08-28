const express = require('express')
const route = express.Router();
const controller = require('../controller/authController');
route.post('/create',controller.create);
route.get('/readall',controller.read);
route.get('/readbyauthor/:author',controller.readauthor);
route.get('/readbyid/:id',controller.readid);
route.get('/readbydateofpublish/:dateofpublish',controller.readdate);
route.get('/readbyprice/:price',controller.readprice);
route.get('/readbystatusofavailability',controller.readstatus);
route.put('/updateall/:id',controller.update);
route.put('/update/:id',controller.updateone);
route.put('/updateany/:id',controller.updateany);
route.delete('/delete/:id',controller.deleteall);

module.exports = route;