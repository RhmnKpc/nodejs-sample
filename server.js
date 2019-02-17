require('rootpath')();
const express=require('express');
const bodyParser = require('body-parser');
let apiKeyFilter=require('./security/filter/ApiKeyFilter');
let mongoose=require('mongoose'); 
const expressValidator = require('express-validator');

app=express();

const port =process.env.PORT || 62000;

app.use(bodyParser.json());
app.use(expressValidator())


let appRoutes = require("./routes/app-router");
let authRouter = require("./routes/auth-router");

//Connect Mongo Db
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDb Connection Error'));

//X-Api-Key-Filter
app.use('*',apiKeyFilter.doFilter);

//For Main Page
app.use('/api//',function (req, res) {
    res.json({
        status: 'This api is working',
        message: 'Welcome to my first node restfull api!',
    });
});

//Login,Register,ForgotPassword
app.use('/auth',authRouter);

//For api context path and routing
app.use('/api/v1', appRoutes);

//For 404
app.use(function(req, res, next){
      res.status(404).json({
        url:req.url,
        message:'404 not found!'
      });
  });
  
  //For Bad Request
  app.use(function(err, req, res, next){
    res.status(400).json(err);
  });

app.listen(port);

console.log('Server is listening on port: '+port);

module.exports=app;
