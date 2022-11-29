const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLInt, } = graphql;

// var books = [
//     { id: 1, name: 'Book 1', genre: 'abc', authorId: '1' },
//     { id: 2, name: 'Book 2', genre: 'qwe', authorId: '2' },
//     { id: 3, name: 'Book 3', genre: 'mno', authorId: '3' },
//     { id: 4, name: 'Book 4', genre: 'xyz', authorId: '3' }
// ]

// var authors = [
//     { id: 1, name: 'Author 1', age: 10 },
//     { id: 2, name: 'Author 2', age: 20 },
//     { id: 3, name: 'Author 3', age: 30 }
// ]

// const BookType = new GraphQLObjectType({
//     name: 'Book',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         genre: { type: GraphQLString },
//         author: {
//             type: AuthorType,
//             resolve(parent, args) {
//                 return authors.find(item => item.id == parent.id)
//             }
//         }
//     })
// })

// const AuthorType = new GraphQLObjectType({
//     name: 'Author',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         age: { type: GraphQLInt },
//         books: {
//             type: new GraphQLList(BookType),
//             resolve(parent, args) {
//                 return books.filter(item => item.authorId == parent.id)
//             }
//         }
//     })
// })

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         book: {
//             type: BookType,
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args) {
//                 // to get data response
//                 return books.find(item => item.id == args.id)
//             }
//         },
//         author: {
//             type: AuthorType,
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args) {
//                 // to get data response
//                 return authors.find(item => item.id == args.id)
//             }
//         },
//         books: {
//             type: new GraphQLList(BookType),
//             resolve(parent, args) {
//                 return books
//             }
//         },
//         authors: {
//             type: new GraphQLList(AuthorType),
//             resolve(parent, args) {
//                 return authors
//             }
//         }
//     }
// })

// const Mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addAuthor: {
//             type: AuthorType,
//             args: {
//                 name: { type: new GraphQLNonNull(GraphQLString) },
//                 age: { type: new GraphQLNonNull(GraphQLInt) }
//             },
//             resolve(parent, args) {
//                 let author = new Author({
//                     name: args.name,
//                     age: args.age
//                 });
//                 return author.save(author)
//             }
//         }
//     }
// })

//Student type schema/model
const StudentType = new GraphQLObjectType({
    name: 'Student',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        standard: { type: GraphQLInt },
        school: { type: GraphQLString }
    })
})

module.exports = { StudentType }
