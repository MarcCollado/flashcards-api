const { buildSchema } = require('graphql');

const { resolvers } = require('./resolvers/decks');

const schema = buildSchema(`
  type Query {
    hello: String!
    decks: [Deck!]!
    deck(id: ID!): Deck
  }

  type Deck {
    id: ID!
    title: String!
    coverImageUrl: String!
  }
`);

exports.schema = schema;
