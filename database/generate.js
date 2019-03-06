const {db, Looks} = require('./index.js');
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
const shirt_base_price = 20;
const shirt_rand_price = 115;

// Constants for Jacket Looks
const jacket_mods = ['TRACK', 'DOWN', 'TRAINING', 'SOFT', 'HALF-ZIP', 'FULL-ZIP', 'INSULATED', 'LIGHTWEIGHT', 'FLEECE', 'PRO', 'HEAVYWEIGHT', 'WARM-UP', 'CLASSIC', 'PERFORMANCE', 'ATHLETIC', 'FITTED', 'THERMAL', 'KNIT', 'TERRY', 'RAIN', 'BASKETBALL', 'FOOTBALL', 'BASEBALL', 'CORE', 'TECH'];
const jacket_types = ['JACKET', 'WINDBREAKER', 'PULLOVER', 'HOODIE', 'SWEATSHIRT', 'COAT', 'SHELL', 'VEST', 'SWEATER'];
const jacket_base_price = 20;
const jacket_rand_price = 115;

// The array that will hold the objects to be loaded
const looksArr = [];

// Populate an existing single look object, or create a new one
var createNewLook = (looksArrIndex, index) => {
  //console.log(`createNewLook: looksArrIndex = ${looksArrIndex}, index = ${index}`);
  let lookObj = looksArr[looksArrIndex] || {};
  //console.log(lookObj);
  // object ids are index + 1
  let i = index + 1;
  // Helper function: Generate a name that has an optional first part of the name 
  // OR an optional second part of the name OR both, and a required third part of the name.
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
  // assign values to this object
  lookObj.id = i;
  lookObj.pant_name = generateName(pant_mods, pant_types);
  lookObj.pant_url = 'https://loremflickr.com/295/295/pants?random' + i;
  lookObj.pant_price = Math.floor(Math.random() * pant_rand_price) + pant_base_price; 
  lookObj.shirt_name = generateName(shirt_mods, shirt_types);
  lookObj.shirt_url = 'https://loremflickr.com/295/295/shirt?random' + i;
  lookObj.shirt_price = Math.floor(Math.random() * shirt_rand_price) + shirt_base_price;
  lookObj.jacket_name = generateName(jacket_mods, jacket_types);
  lookObj.jacket_url = 'https://loremflickr.com/295/295/jacket?random' + i;
  lookObj.jacket_price = Math.floor(Math.random() * jacket_rand_price) + jacket_base_price;

  return lookObj;
}

var createNLookObjs = (n, startIndex) => {
  //console.log(`createNLookObjs: n = ${n}, startIndex = ${startIndex}`);
  for (let i = 0; i < n; i++) {
    // create a new object
    let newLook = createNewLook(i, startIndex + i);
    // push it into the array if the array doesn't already have a value there
    if (!(looksArr[i])) {
      looksArr.push(newLook);
    }
  }
}

var loadLookObjs = (numBatches, perBatch) => {
  // For each batch
  for (let i = 0; i < numBatches; i++) {
    // create perBatch look objects and load them into the looksArr
    let startingIndex = i * perBatch;
    createNLookObjs(perBatch, startingIndex);
    // load the looksArr into the database
    //console.log(JSON.stringify(looksArr));
    Looks.bulkCreate(looksArr)
    .then(() => {
      //console.log('Successfully added Looks');
    })
    .catch(err => {
      console.log('In catch');
      console.log('ERROR: ', err);
    })
  }
}


// looksObj is now a global array declared above
// Total number of objects to generate
let totalToGenerate = 1000;
// Total number of objects before recycling; assume divides equally into TotalToGenerate
let totalPerBatch = 100;

console.log(`totalToGenerate = ${totalToGenerate}, totalPerBatch = ${totalPerBatch}, Batches = ${totalToGenerate/totalPerBatch}`);
console.log('starting -----')
console.time('createAndWriteData');

// load 
loadLookObjs(totalToGenerate/totalPerBatch, totalPerBatch);


//str = JSON.stringify(finalLooksArr);

//console.log(str);

// write headers and footers for the file so I can import it? Assign it to a variable?

// fs.writeFile('./database/generatedData.txt', str, function(err) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log('The file was saved!');
// });

console.timeEnd('createAndWriteData');