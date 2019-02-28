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

var pant_mods = ['SKI', 'GOLF', 'INSULATED', 'LIGHTWEIGHT', 'FLEECE', 'PRO', 'HEAVYWEIGHT', 'WARM-UP', 'TRACK', 'TRAINING', 'COMPRESSION', 'CLASSIC', 'PERFORMANCE', 'ATHLETIC', 'FITTED', 'THERMAL', 'JOGGER', 'KNIT', 'TERRY', 'RAIN', 'BASKETBALL', 'FOOTBALL', 'BASEBALL', 'CORE', 'TECH', 'STRETCH'];

var pant_types = ['PANTS', 'SHORTS', 'JOGGERS', 'TIGHTS', 'SWEATPANTS'];

var shirt_mods = ['CLASSIC', 'TREFOIL', 'SPORT', 'ESSENTIAL', 'PERFORMANCE', 'LONG SLEEVE', 'COMPRESSION', 'FITTED', 'TRAINING', 'SLEEVELESS', 'TECH', 'GRAPHIC', 'COMPRESSION'];

var shirt_types = ['TEE', 'POLO', 'SHIRT', 'JERSEY', 'TANK TOP', 'TOP', 'CREW', 'HENLEY', 'MOCK NECK'];

var jacket_types = ['JACKET', 'WINDBREAKER', 'TRACK JACKET', 'DOWN JACKET', 'PULLOVER', 'HOODIE', 'SWEATSHIRT', 'COAT', 'TRAINING JACKET', 'FLEECE JACKET', 'SOFT SHELL', 'VEST', 'FULL-ZIP', 'HALF-ZIP', 'SWEATER'];

var looksArr = [];

for (let i = 1; i <= 2; i++) {
  // create a new object
  let lookObj = {};
  // create fake data for it
  lookObj.id = i;
  lookObj.pant_name = 
  lookObj.pant_url = 'https://loremflickr.com/295/295/pants,shorts,sweatpants?random=' + i;
  lookObj.pant_price = Math.floor(Math.random() * 110) + 15; 
  lookObj.shirt_name = 'https://loremflickr.com/295/295/shirt,tee,jersey,t-shirt?random=' + i;
  lookObj.shirt_url =
  lookObj.shirt_price = Math.floor(Math.random() * 130) + 20;
  lookObj.jacket_name =
  lookObj.jacket_url = 'https://loremflickr.com/295/295/jacket,windbreaker,coat,sweatshirt,hoodie?random=' + i;
  lookObj.jacket_price = Math.floor(Math.random() * 300) + 30;
  // push it into the array
  looksArr.push(lookObj);
}

str = JSON.parse(looksArr);

fs.writeFile('./database/generatedData.txt', str, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('The file was saved!');
});