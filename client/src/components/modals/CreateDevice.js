import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal, Form, Dropdown, Row, Col } from 'react-bootstrap'
import AlertModal from './AlertModal'
import { Context } from '../..'
import { createDevice, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI'

export default function CreateType({ show, onHide }) {
	const [alertH, setAlertH] = useState(false)
	const { device } = useContext(Context)

	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data))
		fetchBrands().then(data => device.setBrands(data))
		fetchDevices().then(data => device.setDevices(data?.rows))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const [info, setInfo] = useState([])
	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [file, setFile] = useState(null)
	const [type, setType] = useState(null)
	const [brand, setBrand] = useState(null)
	const [isNull, setIsNull] = useState(true)

	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }])
	}
	const removeInfo = number => {
		setInfo(prevState => {
			let currentState = [...prevState]
			return currentState.filter(f => f.number !== number)
		})
	}
	const changeInfo = (key, value, number) => {
		setInfo(info.map(i => (i.number === number ? { ...i, [key]: value } : i)))
	}
	const selectFile = f => {
		let t_files = f.target.files
		if (!t_files?.length) setFile(null)
		else setFile(f.target.files[0])
	}
	const addDevice = () => {
		const formData = new FormData()
		formData.append('name', name)
		formData.append('price', price)
		formData.append('img', file)
		formData.append('brandId', brand?.id)
		formData.append('typeId', type?.id)
		formData.append('info', JSON.stringify(info))
		createDevice(formData).then(data => onHide())
	}
	useEffect(() => {
		let checkNull = !info.length && !name.length && !price && !file && !type && !brand
		setIsNull(checkNull)
	}, [info, name, price, file, type, brand])

	return (
		<Modal show={show} onHide={onHide} size='lg' centered backdrop='static' keyboard={false}>
			<Modal.Header>
				<Modal.Title>Добавить тип</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown>
						<Dropdown.Toggle>{type?.name || 'Выберите тип'}</Dropdown.Toggle>
						<Dropdown.Menu>
							{device.types.map(type => (
								<Dropdown.Item onClick={() => setType(type)} key={type.id}>
									{type.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown className='mt-3'>
						<Dropdown.Toggle>{brand?.name || 'Выберите тип'}</Dropdown.Toggle>
						<Dropdown.Menu>
							{device.brands.map(brand => (
								<Dropdown.Item onClick={() => setBrand(brand)} key={brand.id}>
									{brand.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<Form.Control
						className='mt-3'
						value={name}
						placeholder='Введите название устройства'
						onChange={({ target }) => setName(target.value)}
					/>
					<Form.Control
						className='mt-3'
						value={price}
						placeholder='Введите стоимость устройства'
						pattern='[0-9]'
						onChange={({ target }) => {
							if (target.value.length > 9) return
							if (!isNaN(+target.value)) setPrice(+target.value)
						}}
					/>
					<Form.Control
						accept='image/png, image/jpeg, image/jpg'
						className='mt-3'
						type='file'
						onChange={selectFile}
					/>
					<hr />
					<Button variant='outline-dark' onClick={addInfo}>
						Добавить описание
					</Button>
					<Row className='d-flex flex-column'>
						{info.map(i => (
							<Row key={i.number} className='mt-3'>
								<Col md={4}>
									<Form.Control
										value={i?.title}
										onChange={({ target }) => changeInfo('title', target.value, i.number)}
										placeholder='Введите название характеристики'
									/>
								</Col>
								<Col md={4}>
									<Form.Control
										value={i?.description}
										onChange={({ target }) => changeInfo('description', target.value, i.number)}
										placeholder='Введите описание характеристики'
									/>
								</Col>
								<Col md={4}>
									<Button variant='outline-danger' onClick={() => removeInfo(i.number)}>
										Удалить
									</Button>
								</Col>
							</Row>
						))}
					</Row>
				</Form>
			</Modal.Body>
			<Modal.Footer className='d-flex justify-content-between'>
				<Button variant='outline-danger' onClick={() => (isNull ? onHide() : setAlertH(true))}>
					Закрыть
				</Button>
				<Button variant='outline-success' onClick={addDevice}>
					Добавить
				</Button>
			</Modal.Footer>
			<AlertModal show={alertH} onHide={() => setAlertH(false)} callback={onHide} />
		</Modal>
	)
}
