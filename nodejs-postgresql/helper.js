function emptyOrRows(rows) {
    console.log(!rows);
    if (!rows) {
      return [];
    }
    return rows;
}
  
module.exports = {
    emptyOrRows
}