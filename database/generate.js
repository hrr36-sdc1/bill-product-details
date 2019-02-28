var faker = require('faker');
var fs = require('fs');

/*
// DB definition schema - Looks
const Looks = db.define('Looks', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
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

var pant_mods = ['SKI', 'GOLF', 'INSULATED', 'LIGHTWEIGHT', 'FLEECE', 'PRO', 'HEAVYWEIGHT', 'WARM-UP', 'TRACK', 'TRAINING', 'COMPRESSION', 'CLASSIC', 'PERFORMANCE', 'ATHLETIC', 'FITTED', 'THERMAL', 'KNIT', 'TERRY', 'RAIN', 'BASKETBALL', 'FOOTBALL', 'BASEBALL', 'CORE', 'TECH', 'STRETCH'];

var pant_types = ['PANTS', 'SHORTS', 'JOGGERS', 'TIGHTS', 'SWEATPANTS'];

var shirt_mods = ['CLASSIC', 'TREFOIL', 'SPORT', 'ESSENTIAL', 'PERFORMANCE', 'LONG SLEEVE', 'COMPRESSION', 'FITTED', 'TRAINING', 'SLEEVELESS', 'TECH', 'GRAPHIC', 'COMPRESSION'];

var shirt_types = ['TEE', 'POLO', 'SHIRT', 'JERSEY', 'TANK TOP', 'TOP', 'CREW', 'HENLEY', 'MOCK NECK'];

var jacket_mods = ['TRACK', 'DOWN', 'TRAINING', 'SOFT', 'HALF-ZIP', 'FULL-ZIP', 'INSULATED', 'LIGHTWEIGHT', 'FLEECE', 'PRO', 'HEAVYWEIGHT', 'WARM-UP', 'CLASSIC', 'PERFORMANCE', 'ATHLETIC', 'FITTED', 'THERMAL', 'KNIT', 'TERRY', 'RAIN', 'BASKETBALL', 'FOOTBALL', 'BASEBALL', 'CORE', 'TECH'];

var jacket_types = ['JACKET', 'WINDBREAKER', 'PULLOVER', 'HOODIE', 'SWEATSHIRT', 'COAT', 'SHELL', 'VEST', 'SWEATER'];


var createNewLook = (i) => {
  // create a new object
  let lookObj = {};
  // create fake data for it
  lookObj.id = i;
  lookObj.pant_name = pant_mods[Math.floor(Math.random() * pant_mods.length)] + ' ' + pant_types[Math.floor(Math.random() * pant_types.length)];
  lookObj.pant_url = 'https://loremflickr.com/295/295/pants,shorts,sweatpants?random=' + i;
  lookObj.pant_price = Math.floor(Math.random() * 115) + 20; 
  lookObj.shirt_name = shirt_mods[Math.floor(Math.random() * shirt_mods.length)] + ' ' + shirt_types[Math.floor(Math.random() * shirt_types.length)];
  lookObj.shirt_url = 'https://loremflickr.com/295/295/shirt,tee,jersey,t-shirt?random=' + i;
  lookObj.shirt_price = Math.floor(Math.random() * 100) + 15;
  lookObj.jacket_name = jacket_mods[Math.floor(Math.random() * jacket_mods.length)] + ' ' + jacket_types[Math.floor(Math.random() * jacket_types.length)];
  lookObj.jacket_url = 'https://loremflickr.com/295/295/jacket,windbreaker,coat,sweatshirt,hoodie?random=' + i;
  lookObj.jacket_price = Math.floor(Math.random() * 200) + 30;

  return lookObj;
}

var createNLookObjs = (n) => {
  let looksArr = [];
  for (let i = 1; i <= n; i++) {
    // create a new object
    let lookObj = createNewLook(i);
    // push it into the array
    looksArr.push(lookObj);
  }
  return looksArr;
}

console.time('createAndWriteData');

var finalLooksArr = createNLookObjs(1000);

str = JSON.stringify(finalLooksArr);

//console.log(str);

// write headers and footers for the file so I can import it? Assign it to a variable?

fs.writeFile('./database/generatedData.txt', str, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('The file was saved!');
});

console.timeEnd('createAndWriteData');