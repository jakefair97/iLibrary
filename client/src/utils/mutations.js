import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($book: SavedBookInput) {
    saveBook(book: $book) {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        title
        description
        bookId
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $book) {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        title
        description
        bookId
        image
        link
      
    }
  }
`;
