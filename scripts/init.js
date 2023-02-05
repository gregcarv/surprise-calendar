const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const numberOfCards = process.env.NODE_ENV === "development" ? 300 : 10000;

function generateRandom(max, exclude) {
  const num = Math.round(Math.random() * max);
  return exclude && num !== exclude ? generateRandom(max) : num;
}

const getWinnerPosition = (items) => generateRandom(items.length);

const getConsolationPrizePositions = (items, winner) => {
  const consolationIndeces = [];

  for (let i = 0; i <= 100; i++) {
    consolationIndeces.push(generateRandom(items.length, winner));
  }

  return consolationIndeces;
};

function getCards(numItems) {
  const cardIndices = Array.from(Array(numItems).keys());
  const winnerPosition = getWinnerPosition(cardIndices);
  const consolationPrizePositions = getConsolationPrizePositions(
    cardIndices,
    winnerPosition
  );

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const database = getDatabase(firebaseApp);

  const cardEntries = [];

  cardIndices.map((card, index) => {
    const value =
      index === winnerPosition
        ? 25000
        : consolationPrizePositions.some((item) => item === index)
        ? 100
        : 0;
    cardEntries.push({
      id: card,
      available: true,
      value,
    });
  });

  set(ref(database, "entries"), cardEntries);
}

function withInit(nextConfig = {}) {
  return {
    ...nextConfig,
    // Not actually overwriting rewrites. Just using the async function to fetch optimizely datafile.
    rewrites: () => {
      getCards(numberOfCards);
      return nextConfig.rewrites ? nextConfig.rewrites() : {};
    },
  };
}

module.exports = withInit;
