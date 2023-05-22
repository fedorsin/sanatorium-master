const uuid = require('uuid')
const path = require('path');
const {Sanator, SanatorInfo} = require('../models/models')
const ApiError = require('../error/ApiError');


class SanatorController {
    async create(req, res, next) {
        try {
            let {name, price, site, cityId, typeId, info, legalId, amount, country, latitude, longitude, phone, address} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const sanator = await Sanator.create({name, site, price, cityId, typeId, img: fileName, legalId, amount, country, latitude, longitude, phone, address});
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    SanatorInfo.create({
                        title: i.title,
                        description: i.description,
                        sanatorId: sanator.id
                    })
                )
            }
            return res.json(sanator)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async setDescription(req, res, next) {
        try {
            let {_id,text} = req.body
           const sanator = await Sanator.update(
                {_info: text},
                {where: {id: _id}}
            );
            return res.json(sanator)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        try{
            let {cityId, typeId, limit, page} = req.query
            page = page || 1

            limit = limit || 2

            let offset = page * limit - limit
            let sanators;
            if (!cityId && !typeId) {
                sanators = await Sanator.findAndCountAll({limit, offset})
            }
            if (cityId && !typeId) {
                sanators = await Sanator.findAndCountAll({where:{cityId}, limit, offset})
            }
            if (!cityId && typeId) {
                sanators = await Sanator.findAndCountAll({where:{typeId}, limit, offset})
            }
            if (cityId && typeId) {
                sanators = await Sanator.findAndCountAll({where:{typeId, cityId}, limit, offset})
            }
            return res.json(sanators)
        } catch(e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const sanator = await Sanator.findOne(
            {
                where: {id},
                include: [{model: SanatorInfo, as: 'info'}]
            },
        )
        return res.json(sanator)
    }

    async delOne(req, res) {
        const {id} = req.params
        const sanator = await Sanator.update(
            {amount: '0'},
            {where: {id: id}}
        )
        return res.json(sanator)
    }

    async updated(req, res) {
        const {_id,_amount} = req.body
        const sanator = await Sanator.update(
            {amount: _amount},
            {where: {id: _id}}
        )
        return res.json(sanator)
    }
}

module.exports = new SanatorController()
