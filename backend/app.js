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
        //console.log(data.title);
        notes.push(data);
        var addQuery = 'INSERT INTO todanotes (title, text) VALUES (?,?)';
        db.query(addQuery,[data.title,data.text] , function(err) {
            if (err) throw err;
        });
        io.emit('UPDATE_NOTES', notes);
    });

    socket.on('ADD_TEMPLATE_PAGE', function (data) {
        let newPageID = 0;
        let addQuery = 'INSERT INTO page (title, text, imageTitle, notes, isWorrying) VALUES (?,?,?,?,?)';
        db.query(addQuery, [data.page.title, data.page.text, data.page.imageTitle, data.page.notes, false], function (err) {
            if (err) throw err;
        });
        let checkQuery = 'SELECT MAX(idpage) as id from page;';
        db.query(checkQuery)
            .on('result', function (data) {
                //console.log(data.id);
                newPageID = data.id;
            })
            .on('end', function () {
                addQuery = 'INSERT INTO storypages (story, page, pageNo) VALUES (?,?,?)';
                db.query(addQuery, [data.storyno, newPageID, data.page.id], function (err) {
                    if (err) throw err;
                });
            });
    });

    socket.on('GET_STORY', function (data) {
        let story= {id: 0, title: '', date: '', patient: ''};
        let pages=[];
        let query = 'SELECT * FROM story WHERE idStory=?';
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
                //io.emit('INITIAL_STORY_STATE', story);
            }
        });

        query='SELECT pageNo, page.title, page.imageTitle, page.text, page.notes, page.isWorrying FROM storypages JOIN page on storypages.page=page.idpage WHERE story=?';
        db.query(query, data.storyid , function(err, rows) {
            if (err) throw err;
            if(rows.length === 0) {
                console.log('error');
            } else {
                for(let i=0; i<rows.length; i++)
                {
                    let row = rows[i];

                    let page = {id: 0, title: '', text: '', imageTitle: '', isWorrying: false};
                    page.id=row.pageNo ;
                    page.title=row.title;
                    page.text=row.text;
                    page.imageTitle=row.imageTitle;
                    page.notes=row.notes;
                    page.isWorrying=row.isWorrying;
                    pages.push(page);
                }
                io.emit('INITIAL_STORY_STATE', story, pages);
            }
        });
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