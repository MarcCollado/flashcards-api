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

async function addQuizToDeck(id, newQuiz) {
  return new Promise((resolve, reject) => {
    Decks.findByIdAndUpdate(id, { $push: { quiz: newQuiz } }, (err, deck) => {
      if (err) {
        throw new Error(`Error adding quiz to the deck with id => ${id}`);
      }
      return resolve(newQuiz);
    });
  });
}

exports.getDeck = getDeck;
exports.getDecks = getDecks;
exports.addDeck = addDeck;
exports.addQuizToDeck = addQuizToDeck;
