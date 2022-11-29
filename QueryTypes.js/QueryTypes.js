const callDbQuery = require('../Common/dbQuery');
const { StudentType } = require('../Schema/schema')
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLNonNull, GraphQLInt, GraphQLList } = graphql;

//For selecting data from db
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        students: {
            type: new GraphQLList(StudentType),
            resolve: async (parent, args) => {
                let selecttQuery = 'Select * from student';
                let queryRes = await callDbQuery(selecttQuery);
                return queryRes.response;
            }
        },
        getStudent: {
            type: StudentType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                let insertQuery = 'Select * from student where id=$1';
                let queryParams = [args.id];
                let queryRes = await callDbQuery(insertQuery, queryParams);
                return queryRes.response[0];
            }
        }
    }
})

//For insert/update/delete data from db
const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    fields: {
        addStudent: {
            type: StudentType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                surname: { type: new GraphQLNonNull(GraphQLString) },
                standard: { type: new GraphQLNonNull(GraphQLInt) },
                school: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                let insertQuery = 'Insert into student (name, surname, standard, school) VALUES ($1,$2,$3,$4) RETURNING id';
                let queryParams = [args.name, args.surname, args.standard, args.school];
                let queryRes = await callDbQuery(insertQuery, queryParams);
                return queryRes.response[0];
            }
        },
        updateStudent: {
            type: StudentType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                surname: { type: new GraphQLNonNull(GraphQLString) },
                standard: { type: new GraphQLNonNull(GraphQLInt) },
                school: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                // let insertQuery = `Update student set ${args.updateColName} = $2 where Id = $1 RETURNING id`;
                let updateQuery = `Update student set name = $2,surname=$3,standard=$4,school=$5 where id = $1 RETURNING id`;
                let queryParams = [args.id, args.name, args.surname, args.standard, args.school];
                let queryRes = await callDbQuery(updateQuery, queryParams);
                return queryRes.response[0];
            }
        },
        deleteStudent: {
            type: StudentType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                let insertQuery = 'Delete from student where id=$1 RETURNING id';
                let queryParams = [args.id];
                let queryRes = await callDbQuery(insertQuery, queryParams);
                return queryRes.response[0];
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: MutationType
});