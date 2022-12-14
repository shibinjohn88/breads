const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const multipleBreads = require('../models/multipleBreads.js')
const Baker = require('../models/baker.js')
//INDEX 
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find ().lean ()
  const foundBreads = await Bread.find ().limit (2). lean ()
  res.render ('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })
})
    

//NEW
breads.get('/new', (req, res) => {
    Baker.find()
      .then(foundBakers => {
        res.render('new', {
          bakers: foundBakers
        })
      })
})

// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
      .populate('baker')
      .then(foundBread => {
        res.render('show', {
            bread: foundBread
        })
      })
      .catch(err => {
        res.send('404')
      })
})


  //CREATE
  breads.post('/', (req, res) => {
    console.log(req.body)
    if (!req.body.image) {
        req.body.image = undefined
      }
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    }
    Bread.create(req.body)
      .then(breadCreated => {
        res.redirect('/breads')
        console.log(breadCreated)
      })
      .catch(err => {
        res.status(404).render('404')
        console.log(err)
      })
  })
  
  //DELETE
 
    breads.delete('/:id', (req, res) => {
      Bread.findByIdAndDelete(req.params.id) 
        .then((deletedBread) => { 
          res.status(303).redirect('/breads')
          console.log(deletedBread)
        })
    })


  //UPDATE
  breads.put('/:id', (req, res) => {
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    }else {
      req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, {new: true})
     .then(updateBread => {
        console.log(updateBread)
        res.redirect(`/breads/${req.params.id}`)
     })
    
  })

  //EDIT
  breads.get('/:id/edit', (req, res) => {
    Baker.find()
      .then (foundBakers => {
        Bread.findById(req.params.id) 
         .then(foundBread => { 
           res.render('edit', {
            bread: foundBread,
            bakers: foundBakers 
           })
        })
      })
  })
    
  
  //CREATE MUlTIPLE BREADS
  breads.get('/data/seed', (req, res) => {
    Bread.insertMany(multipleBreads)
      .then(createdBreads => {
        res.redirect('/breads')
        console.log(createdBreads)
      })
  })
  
module.exports = breads


  