import User from '../models/model.js';



const createCustomerTable = async(req,res)=>{
    try {
        await User.createTable()
        res.status(201).json({msg:'Customer create success'})
    } catch (error) {
        res.status(500).json({error})
        console.log(error)
    }
}

export default {
    createCustomerTable
}