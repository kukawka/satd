var express = require('express');
var socket = require('socket.io');
var mysql = require('mysql');
var session = require('express-session');
var app = express();


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
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
db.connect(function (err) {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

io = socket(server);

var notes = [];
var stories = [];
var pages = [];
var images = [];
var initialDataSet = false;
var initialStoriesSet = false;
var initialLibraries = false;
var loggedIn = true;
var username = '';
var chosenStory = 0;

io.on('connection', (socket) => {
    console.log(socket.id);
    if (!initialDataSet) {

        db.query('SELECT * from todanotes')
            .on('result', function (data) {
                // Push results onto the notes array
                notes.push(data)
            })
            .on('end', function () {
                // Only emit notes after query has been completed
                io.emit('INITIAL_NOTES', notes)
            })
        initialDataSet = true;
    }
    else {
        io.emit('INITIAL_NOTES', notes)
    }

    socket.on('CHECKED_IF_LOGGED_IN', function(){
        io.emit('LOGGED_IN_OR_NOT', loggedIn, username);
    });

    socket.on('SET_STORY', function (data) {
        chosenStory = data.id;
        console.log(chosenStory);
    })

    socket.on('ADD_NOTE', function (data) {
        //io.emit('RECEIVE_NOTE', data);
        //console.log(data.title);
        notes.push(data);
        var addQuery = 'INSERT INTO todanotes (title, text) VALUES (?,?)';
        db.query(addQuery, [data.title, data.text], function (err) {
            if (err) throw err;
        });
        io.emit('UPDATE_NOTES', notes);
    });

    socket.on('UPDATE_PAGE', function (data) {
        let updateQuery = 'UPDATE page set title=?, text=?, imageTitle=?, notes=?, isWorrying=? where idpage=?';
        db.query(updateQuery, [data.pageTitle, data.pageText, data.pageImageTitle, data.pageNotes, false, data.pageDBID], function (err) {
            if (err) throw err;
            else {
                console.log(data.pageTitle+data.pageText+ data.pageImageTitle+ data.pageNotes +data.pageDBID);
                console.log('success');
            }
        });
    });

    socket.on('UPDATE_IMAGE', function (data) {
        let updateQuery = 'UPDATE page set imageTitle=? where idpage=?';
        db.query(updateQuery, [data.imageTitle, data.pageDBID], function (err) {
            if (err) throw err;
            else {
                console.log('success');
            }
        });
    });


    socket.on('DELETE_PAGE', function (data) {
        let deleteQuery = 'DELETE FROM page where idpage=?';
        db.query(deleteQuery, [data.pageDBID], function (err) {
            if (err) throw err;
            else {
                //console.log(data.pageNo+ ' '+ data.pageDBID );
                console.log('success deleting');
            }
        });
    });

    socket.on('REORDER_PAGES', function (data) {
        let success = 0;
        let updateQuery = 'UPDATE storypages set pageNo =? where page=? AND story=?';
        db.query(updateQuery, [data.pageDownID, data.pageDownDBID, 1], function (err) {
            if (err) throw err;
            else {
                //console.log('success');
                success = +1;
            }
        });
        db.query(updateQuery, [data.pageUpID, data.pageUPDBID, 1], function (err) {
            if (err) throw err;
            else {
                //console.log('success');
                success = +1;
            }
        });
        if (success >= 2) {
            console.log('success reordering');
        }
    });

    socket.on('ADD_TEMPLATE_PAGE', function (data) {
        //let storyno=data.storyno;
        console.log(data.page.id);
        let addQuery = 'INSERT INTO page (title, text, imageTitle, notes, isWorrying, storyNo, pageNo) VALUES (?,?,?,?,?,?,?)';
        db.query(addQuery, [data.page.title, data.page.text, data.page.imageTitle, data.page.notes, false, chosenStory, data.page.id], function (err) {
            if (err) throw err;
        }).on('end', function () {
            io.emit('PAGE_ADDED');
        });
    });

    socket.on('GET_ALL_STORIES', function () {
        if (!initialStoriesSet) {
            db.query('SELECT * from story')
                .on('result', function (data) {
                    // Push results onto the notes array
                    stories.push(data)
                })
                .on('end', function () {
                    // Only emit notes after query has been completed
                    io.emit('INITIAL_STORIES', stories)
                })
            initialStoriesSet = true;
        }
        else {
            io.emit('INITIAL_STORIES', stories);
        }
    });

    socket.on('GET_LIBRARIES', function () {
        if (!initialLibraries) {
            db.query('SELECT DISTINCT title, text, imageTitle FROM page')
                .on('result', function (data) {
                    // Push results onto the notes array
                    pages.push(data)
                })
                .on('end', function () {

                    db.query('SELECT * from image')
                        .on('result', function (data) {
                            // Push results onto the notes array
                            images.push(data)
                        })
                        .on('end', function () {
                            io.emit('INITIAL_LIBRARIES', pages, images);
                        })
                })
            initialLibraries = true;
        }
        else {
            io.emit('INITIAL_LIBRARIES', pages, images);
        }
    });


    socket.on('NEW_STORY', function (data) {
        let patient = data.patient;
        let title = data.title;

        var newStoryNo = 0;
        db.query('SELECT MAX(idStory) as no FROM story')
            .on('result', function (data) {
                //console.log(data.no);
                newStoryNo = data.no + 1;
                let addStoryQuery = 'INSERT INTO STORY (idStory, title, date, patient) VALUES (?, ?, NOW(), ?)';
                db.query(addStoryQuery, [newStoryNo, title, patient], function (err) {
                    if (err) throw err
                }).on('end', function () {
                    chosenStory=newStoryNo;
                    stories = [];
                    initialStoriesSet = false;
                    io.emit('STORY_CREATED');
                })
            });
    });

    socket.on('DUPLICATE_STORY', function (data) {

        let patient = data.patient;
        let title = data.title;
        //console.log('data passed' + data.patient);

        var newStoryNo = 0;
        let tempTablequery = 'CREATE TEMPORARY TABLE temp_table SELECT title, text, imageTitle, isWorrying, notes, pageNo from page where storyNo=?';
        db.query(tempTablequery, data.id, function (err) {
            if (err) throw err
        }).on('end', function () {
            db.query('SELECT MAX(idStory) as no FROM story')
                .on('result', function (data) {
                    //console.log(data.no);
                    newStoryNo = data.no + 1;
                    //console.log(newStoryNo);
                    //console.log('data passed' + data.title);
                    tempTablequery = 'ALTER TABLE temp_table ADD storyNo int(10) default ?';
                    db.query(tempTablequery, newStoryNo, function (err) {
                        if (err) throw err
                    })

                    let addStoryQuery = 'INSERT INTO STORY (idStory, title, date, patient) VALUES (?, ?, NOW(), ?)';
                    db.query(addStoryQuery, [newStoryNo, title, patient], function (err) {
                        if (err) throw err
                    }).on('end', function () {
                        let addPagesQuery = 'INSERT INTO page (title, text, imageTitle, isWorrying, notes, pageNo, storyNo) SELECT * from temp_table';
                        db.query(addPagesQuery)
                            .on('end', function () {
                                console.log('finished');
                                tempTablequery = 'DROP TEMPORARY TABLE IF EXISTS temp_table';
                                db.query(tempTablequery, function (err) {
                                    if (err) throw err
                                })
                            })
                        stories = [];
                        initialStoriesSet = false;
                        io.emit('STORY_DUPLICATED');
                    })
                })
        })
    })

    socket.on('GET_STORY', function (data) {
        let story = {id: 0, title: '', date: '', patient: ''};
        let pages = [];
        //console.log('getting data for..'+ chosenStory)
        let query = 'SELECT * FROM story WHERE idStory=?';
        db.query(query, chosenStory, function (err, rows) {
            if (err) throw err;
            if (rows.length === 0) {
                console.log('no story');
            } else {
                var row = rows[0];
                story.id = row.idStory;
                story.title = row.title;
                story.date = row.date;
                story.patient = row.patient;
                //io.emit('INITIAL_STORY_STATE', story);
            }
        });

        query = 'SELECT * FROM page WHERE storyNo=?';
        db.query(query, chosenStory, function (err, rows) {
            if (err) throw err;
            if (rows.length === 0) {
                console.log('no pages yet');
            } else {
                for (let i = 0; i < rows.length; i++) {
                    let row = rows[i];

                    let page = {id: 0, title: '', text: '', imageTitle: '', isWorrying: false};
                    page.id = row.pageNo;
                    page.dbid = row.idpage;
                    page.title = row.title;
                    page.text = row.text;
                    page.imageTitle = row.imageTitle;
                    page.notes = row.notes;
                    page.isWorrying = row.isWorrying;
                    pages.push(page);
                }
            }
        }).on('end', function(){
            io.emit('INITIAL_STORY_STATE', story, pages);
        });
    });

    socket.on('tryLoggingIn', function (data) {
        let email=data.email;
        var query = 'SELECT * FROM user where email = ? and password = ?';
        db.query(query, [data.email, data.password], function (err, rows, fields) {
            if (err) throw err;
            if (rows.length === 0) {
                //socket.emit('login', {message: false, session: ''});
            } else {
                //socket.set('session', data.userLogin);
               // socket.emit('login', {message: true, session: session});
                loggedIn=true;
                username=email;
            }
        });
    });
});