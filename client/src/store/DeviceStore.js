import { makeAutoObservable } from 'mobx'
export default class DeviceStore {
	constructor() {
		this._types = [
			{ id: 1, name: 'Холодильники' },
			{ id: 2, name: 'Телефоны' },
			{ id: 3, name: 'Планшеты' },
			{ id: 4, name: 'Накопители' },
		]
		this._brands = [
			{ id: 1, name: 'Sumsung' },
			{ id: 2, name: 'Apple' },
			{ id: 3, name: 'Lenovo' },
		]
		this._devices = [
			{ id: 1, name: 'Iphone 12 Pro', price: 250000, rating: 5, img: 'https://picsum.photos/200/300' },
			{ id: 1, name: 'Holodos 15 eLTRA', price: 2520000, rating: 10, img: 'https://picsum.photos/200/400' },
		]
		this._selectedType = {}
		this._selectedBrand = {}
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
	setSelectedType(type) {
		if (type?.id === this._selectedType?.id) this._selectedType = {}
		else this._selectedType = type
	}
	setSelectedBrand(brand) {
		if (brand?.id === this._selectedBrand?.id) this._selectedBrand = {}
		else this._selectedBrand = brand
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
	get selectedType() {
		return this._selectedType
	}
	get selectedBrand() {
		return this._selectedBrand
	}
}
