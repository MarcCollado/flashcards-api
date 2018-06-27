require('../config/db.js');
const Decks = require('../models/Decks');
const deckList = require('./deckList');

deckList.forEach((deck) => {
  Decks.create(deck, (error, createdDeck) => {
    if (error) {
      console.error(`Error creating ${deck.name}`);
    } else {
      console.info(`New deck created => ${createdDeck}`);
    }
  });
});
