const express = require('express')
const router = express.Router()

const knex = require('../db/knex')


router.get('/', (req,res)=> {
  res.render('index', {
    title: "Welcome to your todos!"
  })
})

module.exports = router;
