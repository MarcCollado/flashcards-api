const Decks = require('../../models/Decks');

async function getDeck(id) {
  return new Promise((resolve) => {
    Decks.findById(id, (err, deck) => {
      if (err) {
        throw new Error(`Error fetching deck with id => ${id}`);
      }
      return resolve(deck);
    });
  });
}

async function getDecks() {
  return new Promise((resolve) => {
    Decks.find((err, decks) => {
      if (err) {
        throw new Error(`Error fetching decks. Details => ${err}`);
      }
      return resolve(decks);
    });
  });
}

async function addDeck(deck) {
  return new Promise((resolve, reject) => {
    const { title, coverImageUrl } = deck;
    const newDeck = {
      title,
      coverImageUrl,
    };
    Decks.create(newDeck, (err, createdDeck) => {
      if (err) {
        throw new Error(`Error creating the deck => ${title}`);
      }
      return resolve(createdDeck);
    });
  });
}

async function addCardToDeck(id, newCard) {
  return new Promise((resolve, reject) => {
    Decks.findByIdAndUpdate(id, { $push: { card: newCard } }, (err, deck) => {
      if (err) {
        throw new Error(`Error adding card to the deck with id => ${id}`);
      }
      return resolve(newCard);
    });
  });
}

exports.getDeck = getDeck;
exports.getDecks = getDecks;
exports.addDeck = addDeck;
exports.addCardToDeck = addCardToDeck;
