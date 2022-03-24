const express =require('express');
const app=express();
const morgan = require('morgan');  

//settings
app.set('port', process.env.PORT ||3000||5000);
app.set('json spaces',2);

//middleware //combinated
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(require('./routes/index'));

app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

//server init
app.listen(app.get('port'),()=>{
    console.log('Hola mundo ',app.get('port'));
});
