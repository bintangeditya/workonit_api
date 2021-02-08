const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// setup the server port
const port = process.env.PORT || 5000;

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get('/', (req, res)=>{
    res.send('Hello World');
});

// import user routes
const userRoutes = require('./src/routes/user.route');
const bookRoutes = require('./src/routes/book.route');
const taskRoutes = require('./src/routes/task.route');


// create user routes
app.use('/api/v1/user', userRoutes);

app.use('/api/v1/book', bookRoutes);

app.use('/api/v1/task', taskRoutes);

// listen to the port
app.listen(port, ()=>{
    console.log(`Express is running at port ${port}`);
});