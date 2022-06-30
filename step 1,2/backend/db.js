const moment = require("moment");
require('dotenv').config();


const initDB = () => {
    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
    connection.connect()
    return connection
}
const createTables = (connection) => {
    let NoteTable = `CREATE TABLE IF NOT EXISTS Note(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        content VARCHAR(10000) NOT NULL,
                        date_added TIMESTAMP,
                        date_expires TIMESTAMP,
                        available BOOLEAN DEFAULT TRUE
                        );`


    let tables = [NoteTable]

    tables.forEach((table, index) => {
        connection.query(table, (error) => {
            if (error) {
                console.log(error.message);
            } else {
                console.log(`${index}) Table created successfully.`)
            }
        });
    })


}
const addNote = (connection, content) => {
    const moment = require('moment')
    let date_added = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let date_expires = moment(moment(date_added).add(process.env.EXPIRATION_TIME, 'm').toDate()).format('YYYY-MM-DD HH:mm:ss');

    let query = `INSERT INTO Note (content, date_added, date_expires) VALUES ("${content}", "${date_added}", "${date_expires}");`
    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (error)
                return reject(error.message);
            return resolve(result.insertId.toString());
        });
    })
}


const getNote = (connection, id) => {
    let query = `SELECT * FROM Note WHERE id = ${id}`
    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (error)
                return reject(error.message);
            else {
                // expired
                if (moment(result[0].date_expires).format('YYYY-MM-DD HH:mm:ss') < moment(new Date()).format('YYYY-MM-DD HH:mm:ss')) {
                    disableNote(connection, id).then(r => {
                        return resolve("^The note has been expired!")
                    }).catch(e => {
                        return reject(e)
                    })
                } else {
                    if (result[0].available) {
                        disableNote(connection, id).then(r => {
                            return resolve(result[0].content);
                        }).catch(e => {
                            return reject(e)
                        })
                    } else {
                        return resolve("^The note has been seen!");
                    }
                }

            }

        });
    })
}

const disableNote = (connection, id) => {
    let deleteQuery = `UPDATE Note SET available = false WHERE id = ${id}`
    return new Promise((resolve, reject) => {
        connection.query(deleteQuery, (error, result) => {
            if (error)
                return reject(error.message);
            return resolve(result);
        })
    })
}


exports.initDB = initDB;
exports.createTables = createTables;
exports.addNote = addNote;
exports.getNote = getNote;
