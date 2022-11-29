const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql')
const callDbQuery = require('./Common/dbQuery');
const schema = require('./QueryTypes.js/QueryTypes')

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '1kb', extended: true }));

//Graphql enpoint only
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))

//get all student data
app.get('/getData', async (req, res) => {
    console.log('getData called!')

    let qryResponse = await callDbQuery('select * from student');
    res.send(qryResponse.response);
})

//insert student data
app.post('/insertData', async (req, res) => {
    console.log('insertData called!')

    let insertQry = 'Insert into student (name, surname, standard, school) VALUES ($1,$2,$3,$4) RETURNING id';
    let qryResponse = await callDbQuery(insertQry, [req.body.name, req.body.surname, req.body.standard, req.body.school]);
    res.send(qryResponse.response);
})

//update student data
app.post('/updateData', async (req, res) => {
    console.log('updateData called!')

    let insertQry = `Update student set ${req.body.updateColName} = $2 where Id = $1`;
    let qryResponse = await callDbQuery(insertQry, [req.body.id, req.body.updateValue]);
    res.send(qryResponse.response);
})

//delete specific data
app.post('/deleteData/:id', async (req, res) => {
    console.log('deleteData called!')

    let qryResponse = await callDbQuery('Delete from student where Id = ' + req.params.id);
    res.send(qryResponse.response);
})

app.listen(3000, () => {
    console.log('Listening on 3000')
})