const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
  _id: ID!
  authors: [String]
  description: String!
  bookId: String!
  image: String
  link: String
  title: String!
}  

type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  input SavedBookInput {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
  }

  type Query {
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveBook(book: SavedBookInput): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
