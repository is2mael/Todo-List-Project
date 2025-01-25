const TaskController = require('../controllers/taskController')

const router = require('express').Router()

router.get('/home', (req, res) => {
    res.send('Welcome to Todo List App')
})
router.get('/todo-list', TaskController.findAll)
router.post('/todo-list', TaskController.createTodo)
router.get('/todo-list/:id', TaskController.detail)
router.put('/todo-list/:id', TaskController.update)
router.delete('/todo-list/:id', TaskController.delete)      

module.exports = router