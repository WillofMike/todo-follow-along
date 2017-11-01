const express = require('express')
const router = express.Router()

const knex = require('../db/knex')

router.get('/', (req,res)=> {
  knex('todo')
  .select()
  .then(todo => {
    res.render('all', {
      todo:todo
    })
  })
})

router.get('/new', (req,res)=> {
  res.render('new')
})

function validateInsertUpdateRedirect(req,res,callback) {
  const todo = {
    title: req.body.title,
    description: req.body.description,
    priority: Number(req.body.priority)
  }
  callback(todo)
}


function respondAndRenderTodo(id, res, viewName) {
  if (typeof id != 'undefined') {
    knex('todo')
    .select()
    .where('id', id)
    .first()
    .then(todo => {
      res.render(viewName, todo)
    })
  } else {
    res.status(500)
  }
}

router.get('/:id', (req,res)=> {
  const id = req.params.id
  respondAndRenderTodo(id, res, 'single')
})

router.get('/:id/edit', (req,res)=> {
  const id = req.params.id
  respondAndRenderTodo(id, res, 'edit')
})

router.post('/', (req,res)=> {
  validateInsertUpdateRedirect(req,res,(todo) => {
    todo.date = new Date();
    knex('todo')
    .insert(todo, 'id')
    .then(ids => {
      const id = ids[0];
      res.redirect(`/todo/${id}`)
    })
  })
})

router.put('/:id', (req,res)=> {
  validateInsertUpdateRedirect(req,res,(todo) => {
    knex('todo')
    .where('id', req.params.id)
    .update(todo, 'id')
    .then(()=> {
      res.redirect(`/todo/${req.params.id}`)
    })
  })
})


router.delete('/:id', (req,res)=> {
  var id = req.params.id;
  console.log(id);
    if (typeof id != 'undefined') {
      knex('todo')
      .where('id', id)
      .del()
      .then(()=> {
        res.redirect('/todo')
    })
  }
})

module.exports = router;
