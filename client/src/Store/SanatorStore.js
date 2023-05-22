import {makeAutoObservable} from "mobx";

export default class SanatorStore {
    constructor() {
        this._types = []
        this._cities = []
        this._sanators = []
        this._legals = []
        this._baskets = []
        this._orders = []
        this._orders_lists = []
        this._selectedType = {}
        this._selectedCity = {}
        this._selectedLegal = {}
        this._selectedOrder = 0
        this._page = 1
        this._totalCount = 0
        this._limit = 8
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types

    }
    setCities(cities) {
        this._cities = cities
    }
    setLegals(legals) {
        this._legals= legals
    }
    setSanators(sanators) {
        this._sanators = sanators
    }

    setBaskets(basket){
        this._baskets = basket
    }

    setOrders(order){
        this._orders = order
    }
    setOrdersList(order){
        this._orders_lists = order
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedCity(city) {
        this.setPage(1)
        this._selectedCity = city
    }
    setSelectedOrder(order) {
        this._selectedOrder = order
    }
    setSelectedLegal(legal) {
        this._selectedLegal = legal
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get cities() {
        return this._cities
    }
    get sanators() {
        return this._sanators
    }
    get basket() {
        return this._baskets
    }
    get order() {
        return this._orders
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedOrder() {

        return this._selectedOrder
    }
    get selectedCity() {
        return this._selectedCity
    }
    get selectedLegal() {
        return this._selectedLegal
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    get legals() {
        return this._legals
    }
}
