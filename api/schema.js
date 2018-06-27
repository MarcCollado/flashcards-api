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

const { getDecks } = require('./resolvers/decks');

const DeckType = new GraphQLObjectType({
  name: 'Deck',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    coverImageUrl: { type: GraphQLString },
  },
});

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root Query type',
  fields: {
    hello: {
      type: new GraphQLNonNull(GraphQLString),
      resolve(_, args) {
        return 'Hello world!';
      },
    },
    decks: {
      type: new GraphQLList(DeckType),
      resolve(_, args) {
        return getDecks();
      },
    },
    // deck: {
    //   type: PlayerType,
    //   args: {
    //     id: { type: GraphQLNonNull(GraphQLID) }
    //   },
    //   resolve(_, args) {
    //     return getDeck(args.id);
    //   }
    // }
  },
});

// const MutationType = new GraphQLObjectType({
//   name: 'Mutation',
//   description: 'The root Mutation type',
//   fields: {
//     createPlayer: {
//       type: PlayerType,
//       args: {
//         player: { type: new GraphQLNonNull(PlayerInputType) }
//       },
//       resolve(_, args) {
//         console.log(args);
//         return createPlayer(args.player);
//       }
//     }
//   },
// });

const schema = new GraphQLSchema({
  query: QueryType,
  // mutation: MutationType,
});

exports.types = { DeckType };
exports.schema = schema;
