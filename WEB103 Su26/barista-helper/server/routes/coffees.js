import express from 'express'
import Controller from '../controllers/coffeeController.js'

const router = express.Router()

router.get('/', Controller.getCoffees)
router.get('/:id', Controller.getCoffeeById)
router.post('/', Controller.createCoffee)
router.delete('/:id', Controller.deleteCoffee)
router.put('/:id', Controller.updateCoffee)

export default router