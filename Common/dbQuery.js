const { Client } = require('pg');
const dbConnObj = require('../Configuration/dbConfig')

//Common function to execute db queries
let dbQuery = async (qry, values) => {
    let dbClient;
    try {
        dbClient = new Client(dbConnObj);
        console.log('in dbQuery')

        await dbClient.connect();
        const res = await dbClient.query(qry, values)
        await dbClient.end()
        console.log('Success!!')

        return { isSuccess: true, response: res.rows }
        // return res;
    }
    catch (err) {
        console.log(err);
        await dbClient.end()
        return { isSuccess: false, response: err }
        // return err;
    }
}

module.exports = dbQuery