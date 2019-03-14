const express = require('express');
//const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const { db , Looks } = require('../database');


app.use(express.static(__dirname + '/../public'));

app.use(cors({
  'origin': '*',
}));

 // to handle postman data in post
app.use(bodyParser.json());
// not really needed, but putting it here in case I want to add a form-based submit of a record
//app.use(bodyParser.urlencoded({ extended: true })); 

let randomId = () => {
  return Math.floor(Math.random() * (9999990));  //I've deleted some from end and haven't reloaded the data
}

// let randomImg = () => {
//   var arr = [];
//   for (var i = 0; i < 18; i++) {
//     arr.push(Math.floor(Math.random() * (101)))
//   }
//   return arr;
// }

db.authenticate()
  .then(() => {
    console.log('Connection to db successful!');
  })
  .catch(err => {
    console.error('Connection to db failed: ', err);
  })

// app.get('/shoes', (req,res) => {
//   console.log('GET: shoes');
//   let arr = randomImg()
//   Shoes.findAll({where : {id : [arr]}})
//     .then(shoes => {
//       res.json(shoes);
//     })
//     .catch(err => {
//       console.log(err);
//     })
// })

// app.get('/shoes/:shoeId', (req,res) => {
//   let id = Number(req.params.shoeId);
//   Shoes.findOne({where: {id: id}})
//   .then(shoe => {
//     res.json(shoe);
//   })
//   .catch(err => {
//     console.log('ERROR: ', err);
//   })
// })

// looks get by id
app.get('/looks/:id', (req,res) => {
  let id = Number(req.params.id);
  Looks.findOne({where: {id: id}})
  .then(look => {
    res.json(look);
  })
  .catch(err => {
    console.log('error', err);
  })
})

// looks post a new look item
// Supports partial updates by passing in only the id and fields to update
// consider whether I can add defaults to this in
// case some fields aren't provided?
app.post('/looks', (req,res) => {
  console.log('POST looks')
  //console.log(req.body);
  Looks.upsert(req.body)
  .then((test) => {
      if (test) {
        res.status(200);
        res.send("Successfully created");
      } else {
      res.status(200);
      res.send("Successfully updated");
      }
  })
  .catch((err) => {
    console.log('error', err);
  })
})


//looks delete by id
app.delete('/looks/:id', (req,res) => {
  let id = Number(req.params.id);
  Looks.destroy({where: {id: id}})
  .then(rowsDeleted => {
    res.sendStatus(200);
  })
  .catch(err => {
    console.log('error', err);
  })
})

// app.get('/shares/:id', (req,res) => {
//   let id = Number(req.params.id);
//   Shares.findOne({where: {id: id}})
//   .then(share => {
//     res.json(share);
//   })
//   .catch( err => {
//     console.log('err', err)
//   })
// })

const PORT = 8001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})

module.exports = app;
