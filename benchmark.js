const siege = require('siege');
// Siege testing file
siege()
  .on(8001)
  .for(10000).times
  .get('/looks/9999990')
  .attack()