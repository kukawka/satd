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
var loggedIn=false ;

io.on('connection', (socket) => {
    console.log(socket.id);
    if(!initialDataSet) {

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
        //io.emit('RECEIVE_NOTE', data);
        console.log(data.title);
        notes.push(data);
        var addQuery = 'INSERT INTO todanotes (title, text) VALUES (?,?)';
        db.query(addQuery,[data.title,data.text] , function(err) {
            if (err) throw err;
        });
        io.emit('UPDATE_NOTES', notes);
    });

    socket.on('GET_STORY', function (data) {
        var story= {id: 0, title: '', date: '', patient: ''};
        var pages=[];
        var query = 'SELECT * FROM story WHERE idStory=?';
        db.query(query, data.storyid , function(err, rows) {
            if (err) throw err;
            if(rows.length === 0 || rows.length >1) {
                console.log('error');
            } else {
                    var row = rows[0];
                    story.id=row.idStory;
                    story.title=row.title;
                    story.date=row.date;
                    story.patient=row.patient;
                io.emit('INITIAL_STORY_STATE', story);
            }
        });
        /*
        query='SELECT * FROM storypages WHERE story=?';
        db.query(query, data.storyid , function(err, rows) {
            if (err) throw err;
            if(rows.length === 0) {
                console.log('error');
            } else {
                for(var i=0; i<rows.length; i++)
                {
                    var row = rows[i];
                    var page = {id: 0, title: '', text: '', imageTitle: '', isWorrying: false};
                    story.id = row.idStory;
                    story.title = row.title;
                    story.date = row.date;
                    story.patient = row.patient;
                }
                //io.emit('INITIAL_STORY_STATE', story);
            }
        });*/
    });

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