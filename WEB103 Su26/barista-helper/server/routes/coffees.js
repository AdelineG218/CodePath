import express from 'express'
import Controller from '../controllers/coffeeController.js'

const router = express.Router()

router.get('/', Controller.getCoffees)
router.get('/coffees/:id', Controller.getCoffeeById)
router.post('/create', Controller.createCoffee)
router.delete('/:id', Controller.deleteCoffee)
router.patch('/edit/:id', Controller.updateCoffee)

export default router