import express from 'express'
import Controller from '../Controller/index.js'


const router = express.Router()


router.post('/createtable',Controller.createCustomerTable)
router.post('/addcustomer',Controller.addCustomer)
router.post('/addproduct',Controller.createProduct)
router.post('/addorder',Controller.addOrder)
router.get('/getlastthrityday',Controller.shortBydate)
router.put('/updatepricebyname',Controller.updatePrice)
router.get('/gettopthreeprice',Controller.gettopprice)
router.get('/getproductorderbyname',Controller.getproductorderbyname)
router.get('/joincutomerandproduct',Controller.joincutomerandproduct)
router.get('/totalhighretrive',Controller.totalhighretrive)
router.get('/average',Controller.average)
router.get('/getAllsum',Controller.getAllsum)


export default router