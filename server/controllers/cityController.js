const {City, Sanator, SanatorInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class CityController {
    async create(req, res, next) {
        try{
        const {name} = req.body
        const city = await City.create({name})
        }catch (e)
        {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const cities = await City.findAll()
        return res.json(cities)
    }

    async getOne(req, res) {
        const {id} = req.params
        const sanator = await City.findOne(
            {
                where: {id},
                include: [{model: SanatorInfo, as: 'info'}]
            },
        )
        return res.json(sanator)
    }
}




module.exports = new CityController()
