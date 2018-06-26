const Decks = require('../../models/Decks');

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

exports.getDecks = getDecks;
