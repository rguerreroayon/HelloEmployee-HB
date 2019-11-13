const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');


// Initializations
const app = express();


//Settings
app.set('port',4000); //PORT

app.set('views',path.join(__dirname,'views'));


app.engine('.hbs',exphbs({ // HANDLEBARS CONF
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs');


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Global Variables
app.use((req,res,next) =>{
    next();
});


//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/employees',require('./routes/employees'));

//public


//Server STARTO

app.listen(app.get('port'),  () => {
    console.log('Server starto porto ',app.get('port'));
});



