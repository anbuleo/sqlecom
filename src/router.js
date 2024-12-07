import express from 'express'
import Controller from './Controller/index.js'


const router = express.Router()


router.post('/createtable',Controller.createCustomerTable)



export default router