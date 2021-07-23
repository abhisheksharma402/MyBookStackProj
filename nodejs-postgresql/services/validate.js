const db = require('./db');
const helper = require('../helper');


async function check(reqBody){
    const rows = await db.query(
        `SELECT * FROM users where email = '${reqBody.email}'`
    );
    // console.log(rows);
    if(rows.length > 0)
        return true;
    return false;
}


async function insertNewUser(user){
    const rows = await db.query(
        `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}') RETURNING *`
    );
    // console.log(rows);

    const data = helper.emptyOrRows(rows);
    return data;
}


async function getUserByEmail(userEmail){
    const rows = await db.query(
        `SELECT * FROM users where email = '${userEmail}'`
    );
    // console.log("rows: ");
    const data = helper.emptyOrRows(rows);
    return rows;
}





module.exports = {
    check,
    insertNewUser,
    getUserByEmail,
};
