const { Sanator, BasketSanator, Basket } = require("../models/models")

class BasketController {
    // ------ CRUD корзины ------ //

    async addToBasket(req,res,next){
        const user = req.user
        const {sanatorId} = req.body
        const basket = await BasketSanator.create({basketId : user.id, sanatorId : sanatorId})
        return res.json(basket)
    }

    async getBasketUser(req,res){
        const {id} = req.user
        const basket = await BasketSanator.findAll({include: {
                model: Sanator
            }, where: {basketId: id}})
        if(!basket) res.status(400).json('None Id')
        return res.json(basket)
    }

    async deleteBasket (req, res) {
        const {id} = req.body
        if(!id) res.status(400).json('None Id')
            await BasketSanator.destroy({where: {id: id}})
        res.status(200).json('Product deleted')
    }

}

module.exports = new BasketController()