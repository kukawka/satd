var express = require('express');
var socket = require('socket.io');
var mysql  = require('mysql');
var session = require('express-session');
var app = express();


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

server = app.listen(8080, function () {
    console.log('server is running on port 8080')
});

var db = mysql.createConnection({
    host: 'silva.computing.dundee.ac.uk',
    user: 'satd',
    database: 'satddb',
    password: '9845.at7.5489'
});

// Log any errors connected to the db
db.connect(function(err){
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

io = socket(server);

var notes=[];
var initialDataSet=false ;

io.on('connection', (socket) => {
    console.log(socket.id);
    if(!initialDataSet) {
        var sess = session;  //initialize session variable
        session.user = "sarahsmith";
        console.log(session.user);

        db.query('SELECT * from todanotes')
            .on('result', function (data) {
                // Push results onto the notes array
                notes.push(data)
            })
            .on('end', function () {
                // Only emit notes after query has been completed
                io.emit('INITIAL_NOTES', notes)
            })
        initialDataSet=true ;
    }
    else{
        io.emit('INITIAL_NOTES', notes)
    }
    //console.log("hello");
    socket.on('ADD_NOTE', function (data) {
        io.emit('RECEIVE_NOTE', data);
    })

    socket.on('tryLoggingIn', function (data) {
        var query = 'SELECT * FROM user where email = ? and password = ?';
        db.query(query,[data.email,data.password] , function(err, rows, fields) {
            if (err) throw err;
            if(rows.length === 0) {
                socket.emit('login', {message: false, session: ''});
            } else {
                //socket.set('session', data.userLogin);
                socket.emit('login', {message: true, session: session});
            }
        });
    });
});