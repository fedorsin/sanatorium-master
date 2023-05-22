import {$authHost, $host} from "./index";


export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createCity = async (city) => {
    const {data} = await $authHost.post('api/city', city)
    return data
}

export const fetchCities = async () => {
    const {data} = await $host.get('api/city', )
    return data
}
export const fetchLegal = async () => {
    const {data} = await $host.get('api/legal', )
    return data
}

export const createLegal = async (legal) => {
    const {data} = await $host.post('api/legal/new', legal)
    return data
}


export const createSanator = async (sanator) => {
    const {data} = await $authHost.post('api/sanator', sanator)
    return data
}

export const delSanator = async (id) => {
    const {data} = await $authHost.post('api/sanator/del/'+ id)
    return data
}

export const setDescription = async (_id, text) => {
    const {data} = await $authHost.post('api/sanator/update', _id, text)
    return data
}

export const fetchSanators = async (typeId, cityId, page, limit) => {
    const {data} = await $host.get('api/sanator', {params: {
            typeId, cityId, page, limit
        }})
    return data
}

export const fetchOneSanator = async (id) => {
    const {data} = await $host.get('api/sanator' + '/'+id)
    return data
}

// ------ Корзина ------- //

export const addToBasket = async (sanatorId) => {
    const {response} = await $authHost.post('api/basket', sanatorId)
    return response
}

export const deleteFromBasket = async (id) => {
    const {response} = await $authHost.post('api/basket/delete', {id:id})
    return response
}

export const getBasket = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}
// ------ Заказ ------- //
export const addOrder = async (id, phone, postcode, addressee) => {
    const {data} = await $host.post('api/order', {
            id, phone, postcode, addressee
        })
    return data
}

export const getOrder = async (id) => {
    const {data} = await $authHost.get('api/order/')
    return data
}


export const getUserOrder = async (id) => {
    if(!id)id = 0;
    const {data} = await $authHost.get('api/order/user/'+id, id)
    return data
}

export const getUserOrderList = async (id) => {
    if(!id)id = 0;
    const {data} = await $authHost.get('api/order/'+id, id)
    return data
}

export const updateUserOrder = async (id, status) => {
    if(!id)id = 0;
    const {data} = await $authHost.post('api/order/update/'+id, {params:{id, status}})
    return data
}

export const updateAmount = async (_id, _amount) => {
    const {data} = await $authHost.post('api/sanator/update/'+_id, {_id, _amount})
    return data
}
