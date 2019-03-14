const db = require('./index.js');  // Removed Looks since using copy to load data into postgres
var faker = require('faker');
var fs = require('fs');


/*
// DB definition schema - Looks
const Looks = db.define('Looks', {
  id: { type: Sequelize.INTEGER, primaryKey: true},
  pant_name: Sequelize.STRING,
  pant_url: Sequelize.STRING,
  pant_price: Sequelize.INTEGER,
  shirt_name: Sequelize.STRING,
  shirt_url: Sequelize.STRING,
  shirt_price: Sequelize.INTEGER,
  jacket_name: Sequelize.STRING,
  jacket_url: Sequelize.STRING,
  jacket_price: Sequelize.INTEGER,
});

// Example db object
[
  {
    "id": 1,
    "pant_name": "TREFOIL SHORTS",
    "pant_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/pant1.jpg",
    "pant_price": 75,
    "shirt_name": "OUTLINE TEE",
    "shirt_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/shirt1.jpg",
    "shirt_price": 45,
    "jacket_name": "SST WINDBREAKER",
    "jacket_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/jacket1.jpg",
    "jacket_price": 80
  }
]

*/

// Constants for Pants Looks
const pant_mods = ['SKI', 'GOLF', 'INSULATED', 'LIGHTWEIGHT', 'FLEECE', 'PRO', 'HEAVYWEIGHT', 'WARM-UP', 'TRACK', 'TRAINING', 'COMPRESSION', 'CLASSIC', 'PERFORMANCE', 'ATHLETIC', 'FITTED', 'THERMAL', 'KNIT', 'TERRY', 'RAIN', 'BASKETBALL', 'FOOTBALL', 'BASEBALL', 'CORE', 'TECH', 'STRETCH'];
const pant_types = ['PANTS', 'SHORTS', 'JOGGERS', 'TIGHTS', 'SWEATPANTS'];
const pant_base_price = 20;
const pant_rand_price = 115;

// Constants for Shirts Looks
const shirt_mods = ['CLASSIC', 'TREFOIL', 'SPORT', 'ESSENTIAL', 'PERFORMANCE', 'LONG SLEEVE', 'COMPRESSION', 'FITTED', 'TRAINING', 'SLEEVELESS', 'TECH', 'GRAPHIC', 'COMPRESSION'];
const shirt_types = ['TEE', 'POLO', 'SHIRT', 'JERSEY', 'TANK TOP', 'TOP', 'CREW', 'HENLEY', 'MOCK NECK'];
const shirt_base_price = 15;
const shirt_rand_price = 125;

// Constants for Jacket Looks
const jacket_mods = ['TRACK', 'DOWN', 'TRAINING', 'SOFT', 'HALF-ZIP', 'FULL-ZIP', 'INSULATED', 'LIGHTWEIGHT', 'FLEECE', 'PRO', 'HEAVYWEIGHT', 'WARM-UP', 'CLASSIC', 'PERFORMANCE', 'ATHLETIC', 'FITTED', 'THERMAL', 'KNIT', 'TERRY', 'RAIN', 'BASKETBALL', 'FOOTBALL', 'BASEBALL', 'CORE', 'TECH'];
const jacket_types = ['JACKET', 'WINDBREAKER', 'PULLOVER', 'HOODIE', 'SWEATSHIRT', 'COAT', 'SHELL', 'VEST', 'SWEATER'];
const jacket_base_price = 40;
const jacket_rand_price = 125;

// Rewrite data generation and loading to write all data out as a single CSV file
// Change data loading into postgres to use copy to load data from the CSV file

// Create a stream to a file using fs
const myCSVStream = fs.createWriteStream('./database/looksdata.csv');

// Re-written to create a single csv string
var createNewCSVStr = (index) => {
  // object ids are index + 1
  let i = index + 1;

  // Helper function: Generate a name that has an optional first part of the name 
  // OR an optional second part of the name OR both, 
  // AND a required third part of the name.
  let generateName = (modArr, typeArr) => {
    // 50% chance of a random first string
    let retStr = (Math.random() >= 0.5) ? faker.random.word().split(' ')[0].toUpperCase() + ' ' : '';
    // 50% chance of generating a second string if the first string exists, otherwise 100%
    retStr += (retStr.length) ? 
               (Math.random() >= 0.5) ? modArr[Math.floor(Math.random() * modArr.length)] + ' ' : ''
             : modArr[Math.floor(Math.random() * modArr.length)] + ' ';
    // Always generate the third string
    retStr += typeArr[Math.floor(Math.random() * typeArr.length)];
    return retStr;
  }

  // create the CSV string
  
  let csvStr = i +',';
  csvStr += generateName(pant_mods, pant_types) + ',';
  csvStr += 'https://loremflickr.com/295/295/pants?random' + i +',';
  csvStr += Math.floor(Math.random() * pant_rand_price) + pant_base_price + ','; 
  csvStr += generateName(shirt_mods, shirt_types) + ',';
  csvStr += 'https://loremflickr.com/295/295/shirt?random' + i + ',';
  csvStr += Math.floor(Math.random() * shirt_rand_price) + shirt_base_price + ',';
  csvStr += generateName(jacket_mods, jacket_types) +',';
  csvStr += 'https://loremflickr.com/295/295/jacket?random' + i +',';
  csvStr += Math.floor(Math.random() * jacket_rand_price) + jacket_base_price + '\n';

  return csvStr;
}

// Creates and writes N CSV Strings to a file
// Remove parameters and move i and n to global variables so you can restart if the write fails.
var idx = 0; // start at 0
var N = 10000000;  // How many records to create and write
var createAndWriteNCSVStrings = () => {
  //console.log(`createNLookObjs: n = ${n}, startIndex = ${startIndex}`);
  // for (let i = 0; i < n; i++) {
  while(idx < N) {
    // create a new string
    let newCSVStr = createNewCSVStr(idx);
    //console.log(newCSVStr);
    // increment the index
    idx++;
    // write it to the CSV file
    if (!myCSVStream.write(newCSVStr)) {
      // if it fails, return, and the drain event below will restart the process
      return;
    }
  }
  // close the file
  myCSVStream.end();
}

// Keeping this in case I want to switch back to batches
// However, the way way I have to use drain to restart the write process when it fails seems to prohibit using 
// batches unless some of these parameters were moved to the global scope
// var loadBatches = (numBatches, perBatch) => {
//   // For each batch
//   for (let i = 0; i < numBatches; i++) {
//     // create perBatch look objects and load them into the looksArr
//     let startingIndex = i * perBatch;
//     createAndWriteNCSVStrings(perBatch, startingIndex);
//   }
// }


// // Total number of objects to generate
// let totalToGenerate = 100;
// // Total number of objects before recycling; assume divides equally into TotalToGenerate
// let totalPerBatch = 100;

// console.log(`totalToGenerate = ${totalToGenerate}, totalPerBatch = ${totalPerBatch}, Batches = ${totalToGenerate/totalPerBatch}`);

console.log('starting -----')
console.time('createAndWriteData');

// When finished writing to the file, stop the timer and end the process
myCSVStream.on('finish', () => {
  console.timeEnd('createAndWriteData');
  process.exit(0);
});

// If the generation of the data is faster than the writing to the file, the write will fail. 
// This will start it back up again
myCSVStream.on('drain', () => {
  createAndWriteNCSVStrings();
});

// Start creating and writing to the file
createAndWriteNCSVStrings();

// load batches 
// loadBatches(totalToGenerate/totalPerBatch, totalPerBatch);

