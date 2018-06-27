const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Decks = new Schema(
  {
    // _id created by default
    title: String,
    coverImageUrl: String,
    quiz: [{ question: String, answer: String }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Deck = mongoose.model('Deck', Decks);

module.exports = Deck;
