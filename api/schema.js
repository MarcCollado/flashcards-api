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

const { getDeck, getDecks, createDeck } = require('./resolvers/decks');

const QuizType = new GraphQLObjectType({
  name: 'Quiz',
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    question: { type: GraphQLNonNull(GraphQLString) },
    answer: { type: GraphQLNonNull(GraphQLString) },
  },
});

const DeckType = new GraphQLObjectType({
  name: 'Deck',
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    coverImageUrl: { type: GraphQLNonNull(GraphQLString) },
    quiz: { type: GraphQLList(QuizType) },
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
    createDeck: {
      type: GraphQLNonNull(DeckType),
      args: {
        deck: { type: new GraphQLNonNull(DeckInputType) },
      },
      resolve(_, args) {
        return createDeck(args.deck);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations,
});

// why export this one?
exports.schema = schema;
