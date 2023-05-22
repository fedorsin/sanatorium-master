const { Order, OrderSanator, BasketSanator, Sanator} = require("../models/models")

class OrderController {
    // ------ CRUD корзины ------ //

    async addOrder(req,res,next){

        let newOrder = {
            userId: req.body.id ,
            phone: req.body.phone,
            postcode: req.body.postcode,
            addressee: req.body.addressee
        }

        const basket = await BasketSanator.findAll({where: {basketId: req.body.id}})

        if (basket.length >= 1)
        {
            const order = await Order.create(newOrder)
                basket.forEach(i =>
                OrderSanator.create({
                    orderId: order.id,
                    sanatorId: i.sanatorId,
                    basketId: i.id,
                }),
            await BasketSanator.destroy({where: {basketId: req.body.id}})
        )
            res.status(201).json(order)
    }
        res.status(404)
        console.log("haven't sanotoriums")
    }

    async getAll(req,res){
        const order = await Order.findAll()
        return res.json(order)
    }

    async getUserOrder(req,res){
        const {id} = req.params
        const date = await Order.findAll({where: {userId: id}} )
          // delete the dot and everything after
        return res.json(date)
    }
    async getUserOrderList(req,res){
        const {id} = req.params
        const date = await Order.findOne( {where: {id: id}})
        const a =  await OrderSanator.findAll({include: {
                model: Sanator
            }, where: {orderId: id}});
        return res.json(a)
    }
    async updateUserOrder(req,res){
        const {_id,_status} = req.params
        const sanator = await Order.update(
            {status: _status},
            {where: {id: _id}}
        )
        return res.json(sanator)
    }
}

module.exports = new OrderController()