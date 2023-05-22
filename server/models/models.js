const sequelize = require('../db')
const {DataTypes} = require('sequelize')
let Lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
let tat = "-"
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},

})
const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.STRING,  allowNull: false},
    postcode: {type: DataTypes.STRING, allowNull: false},
    addressee: {type: DataTypes.STRING, allowNull: false},
    status:{type: DataTypes.INTEGER, defaultValue: 1}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


const Sanator = sequelize.define('sanator', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    _info:{type: DataTypes.TEXT, defaultValue: Lorem},
    site:{type: DataTypes.TEXT, allowNull: false},
    address: {type: DataTypes.STRING,  allowNull: false},
    phone: {type: DataTypes.STRING,  allowNull: false},
    amount:{type: DataTypes.INTEGER, allowNull: false},
    country:{type: DataTypes.STRING, allowNull: false},
    latitude:{type: DataTypes.REAL, allowNull: false},
    longitude:{type: DataTypes.REAL, allowNull: false},
})



const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const City = sequelize.define('city', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const SanatorInfo = sequelize.define('sanator_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const BasketSanator = sequelize.define('basket_sanator', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const OrderSanator = sequelize.define('order_sanator', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Legal = sequelize.define('legal', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,  allowNull: false},
    legal_p: {type: DataTypes.STRING,  allowNull: false},
    descr: {type: DataTypes.STRING},
    type: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING},
    located: {type: DataTypes.STRING,  allowNull: false},
    bill: {type: DataTypes.STRING,  allowNull: false},
    inn: {type: DataTypes.STRING, allowNull: false},
    comment: {type: DataTypes.STRING},
})

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    comment: {type: DataTypes.STRING, allowNull: false},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderSanator);
OrderSanator.belongsTo(Order);

Basket.hasMany(BasketSanator);
BasketSanator.belongsTo(Basket);

Order.hasOne(User);
User.belongsTo(Order);

Type.hasMany(Sanator);
Sanator.belongsTo(Type);

City.hasMany(Sanator);
Sanator.belongsTo(City);

Sanator.hasMany(SanatorInfo, {as: 'info'});
SanatorInfo.belongsTo(Sanator);

Sanator.hasMany(BasketSanator);
BasketSanator.belongsTo(Sanator);
Sanator.hasMany(OrderSanator);
OrderSanator.belongsTo(Sanator);

Legal.hasMany(Sanator);
Sanator.belongsTo(Legal);

User.hasMany(Review)
Review.belongsTo(User)

Sanator.hasMany(Review)
Review.belongsTo(Sanator)


module.exports = {
    User,
    Basket,
    BasketSanator,
    Sanator,
    Type,
    City,
    SanatorInfo,
    Order,
    OrderSanator,
    Legal,
    Review
}





