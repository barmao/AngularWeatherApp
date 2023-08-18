const fs = require('fs');

const commodities = ["Dry Maize", "Wet Maize", "Rice", "Wheat", "Barley", "Sorghum", "Millet", "Beans", "Peas", "Lentils"];
const grades = ["White Maize", "Yellow Maize", "Basmati", "Hard Red", "Hulled", "Red", "Pearl", "Pinto", "Green", "Red Split"];
const markets = ["Nyansiongo", "Chuka", "Cheptulu", "Isebania Market", "Nyeri open air", "Kerugoya", "Kitale", "Flax", "Keroka", "Mabera"];

const getRandomPrice = (min = 40, max = 120) => +(Math.random() * (max - min) + min).toFixed(2);

const basePrices = commodities.map(() => getRandomPrice(40, 120));

const adjustPrice = (basePrice) => {
  const fluctuation = basePrice * (Math.random() * 0.04 - 0.02); // Random fluctuation between -2% and +2%
  return +(basePrice + fluctuation).toFixed(2);
};

const generateDataForDate = date => commodities.map((commodity, index) => {
  const adjustedPrice = adjustPrice(basePrices[index]);
  basePrices[index] = adjustedPrice; // Update the base price for the next day
  return markets.map(market => ({
    commodity, grade: grades[index], sex: "-", market, price: adjustedPrice, date: date.toISOString().split('T')[0]
  }));
}).flat();

const generateDataForLastWeek = () => {
  const data = [];
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  while (lastWeek <= today) {
    data.push(...generateDataForDate(new Date(lastWeek)));
    lastWeek.setDate(lastWeek.getDate() + 1);
  }
  return data;
};

const dataset = {
  market: generateDataForLastWeek()
};

fs.writeFileSync('db.json', JSON.stringify(dataset, null, 2));
console.log('db.json has been generated!');
