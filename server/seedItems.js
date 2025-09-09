require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./model/Item');
const dbConnection = require('./config/dbConnection');
const path = require('path');

dbConnection(); // Connect to MongoDB

async function seed() {
  let Items;
  try {
    const { pathToFileURL } = require('url');
    const dataPath = pathToFileURL(path.resolve(__dirname, '..', 'src', 'components', 'data.js')).href;
    ({ Items } = await import(dataPath));
  } catch (err) {
    console.error('Failed to import Items from data.js:', err);
    process.exit(1);
  }

  dbConnection(); // Connect to MongoDB

  Item.insertMany(Items)
    .then(() => {
      console.log('Items seeded successfully!');
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error seeding items:', err);
      mongoose.connection.close();
    });
}

seed();
