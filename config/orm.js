const connection = require("../config/connection.js")

function printQuestionMarks(num) {
    let arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }

    return arr.toString();
}

function objToSql(ob) {
    let arr = [];
  
    for (let key in ob) {
      let value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
  
    return arr.toString();
}

let orm = {
    selectAll: function(tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result)
        });
    },
    insertOne: function(table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table + " (";
        queryString += cols.toString();
        queryString += ") VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") "
        console.log(queryString)
        console.log(vals)
        connection.query(queryString, vals, function(err,result) {
            if (err) throw err;
            cb(result)
        });
    },
    updateOne: function(table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table + " SET "
        queryString += objToSql(objColVals) + " WHERE " + condition
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result)
        })
    }
}

module.exports = orm;