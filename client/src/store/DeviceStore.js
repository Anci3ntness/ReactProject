import { makeAutoObservable } from "mobx"
export default class DeviceStore {
    constructor() {
        this._types = [
            { id: 1, name: "Холодильники" }
        ]
        this._brands = [
            { id: 1, name: "Sumsung" }
        ]
        this._devices = [
            { id: 1, name: "Iphone 12 Pro", price: 250000, rating: 5, img: "https://picsum.photos/200/300" }
        ]
        makeAutoObservable(this)
    }
    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }
    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
}