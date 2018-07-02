const {
  GraphQLSchema,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const {
  getDeck,
  getDecks,
  addDeck,
  addCardToDeck,
} = require('./resolvers/decks');

const CardType = new GraphQLObjectType({
  name: 'Card',
  fields: {
    id: { type: GraphQLID },
    question: { type: GraphQLNonNull(GraphQLString) },
    answer: { type: GraphQLNonNull(GraphQLString) },
  },
});

const CardInputType = new GraphQLInputObjectType({
  name: 'CardInput',
  fields: {
    question: { type: new GraphQLNonNull(GraphQLString) },
    answer: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const DeckType = new GraphQLObjectType({
  name: 'Deck',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLNonNull(GraphQLString) },
    coverImageUrl: { type: GraphQLNonNull(GraphQLString) },
    card: { type: GraphQLList(CardType) },
  },
});

const DeckInputType = new GraphQLInputObjectType({
  name: 'DeckInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    coverImageUrl: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const Queries = new GraphQLObjectType({
  name: 'Queries',
  description: 'The root Query type',
  fields: {
    deck: {
      type: DeckType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        return getDeck(args.id);
      },
    },
    decks: {
      type: new GraphQLList(DeckType),
      resolve(_, args) {
        return getDecks();
      },
    },
  },
});

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  description: 'The root Mutation type',
  fields: {
    addDeck: {
      type: GraphQLNonNull(DeckType),
      args: {
        deck: { type: new GraphQLNonNull(DeckInputType) },
      },
      resolve(_, args) {
        return addDeck(args.deck);
      },
    },
    addCardToDeck: {
      type: GraphQLNonNull(CardType),
      args: {
        deckID: { type: new GraphQLNonNull(GraphQLID) },
        card: { type: new GraphQLNonNull(CardInputType) },
      },
      resolve(_, args) {
        return addCardToDeck(args.deckID, args.card);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations,
});

exports.schema = schema;
