const express =require('express');
const app=express();
const morgan = require('morgan');  

//settings
app.set('port', process.env.PORT ||3000);
app.set('json spaces',2);

//middleware //combinated
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(require('./routes/index'));

//server init
app.listen(3000,()=>{
    console.log('Hola mundo ',app.get('port'));
});
