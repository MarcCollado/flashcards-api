const Decks = require('../../models/Decks');

async function getDeck(id) {
  return new Promise((resolve) => {
    Decks.findById(id, (err, deck) => {
      if (err) {
        throw new Error(`Error fetching deck with id ${id}`);
      }
      return resolve(deck);
    });
  });
}

async function getDecks() {
  return new Promise((resolve) => {
    Decks.find((err, decks) => {
      if (err) {
        throw new Error(`Error fetching decks. Details: ${err}`);
      }
      return resolve(decks);
    });
  });
}

async function createDeck(args) {
  return new Promise((resolve, reject) => {
    const { title, coverImageUrl } = args;
    const newDeck = {
      title,
      coverImageUrl,
    };
    Decks.create(newDeck, (err, createdDeck) => {
      if (err) {
        throw new Error(`Error creating the deck ${name}`);
      }
      return resolve(createdDeck);
    });
  });
}

exports.getDeck = getDeck;
exports.getDecks = getDecks;
exports.createDeck = createDeck;
