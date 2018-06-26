const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeckSchema = new Schema(
  {
    // _id created by default
    title: String,
    coverImageUrl: String,
    quiz: [{ question: String, answer: String }],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

const Deck = mongoose.model('Deck', DeckSchema);

module.exports = Deck;
