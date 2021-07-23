const db = require('./db');
const helper = require('../helper');
// const config = require('../config');


async function getAllBooks(){
    const rows = await db.query(
        'SELECT * FROM books'
    );
    console.log(rows);

    const data = helper.emptyOrRows(rows);
    return {data};
}


// async function getBooksBySchool(reqBody){
//     const rows = await db.query(
//         `SELECT * FROM books WHERE school_id = ${reqBody.school_id}`
//     );
//     console.log(rows);

//     const data = helper.emptyOrRows(rows);
//     return {data};
// }


async function getBooksBySchoolAndClass(reqBody){

    const rows = await db.query(
        `SELECT * FROM books WHERE school_id = ${reqBody.school_id} AND grade = ${reqBody.grade}`
    );
    console.log(rows);

    const data = helper.emptyOrRows(rows);
    return {data};
}



async function ifCartExits(reqBody){
    const rows = await db.query(
        `SELECT * FROM cart where user_id = ${reqBody["row1"].user_id}`
    );
    const data = helper.emptyOrRows(rows);
    return data;
}




module.exports = {
    getAllBooks,
    getBooksBySchoolAndClass,
    ifCartExits
};
