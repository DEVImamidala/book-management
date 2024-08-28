const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const  create = require('./route/routes');
const insert= require('./route/userroute');
const  app = express();
app.use(bodyParser.json());
app.use('/',create);
app.use('/api/user',insert);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});