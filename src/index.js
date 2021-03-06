const express =require('express');
const app=express();
const morgan = require('morgan');  
const cors = require('cors');

app.use(cors());
//settings
app.set('port', process.env.PORT);
app.set('json spaces',2);

//middleware //combinated
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(require('./routes/index'));

//server init
app.listen(app.get('port'),()=>{
    console.log('Hola mundo ',app.get('port'));
});
