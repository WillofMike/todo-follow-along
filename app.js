const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes/index')
const todo = require('./routes/todo')
const app = express()

const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs');

const hbs = require('hbs')

hbs.registerHelper('select', function(selected, options) {
  return options.fn(this).replace(new RegExp('value=\"' + selected + '\"'), '$& selected="selected"')
})

app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

app.use('/todo', todo)
app.use('/', routes)



app.listen(port, ()=> {
  console.log('listening on: ', port);
})
