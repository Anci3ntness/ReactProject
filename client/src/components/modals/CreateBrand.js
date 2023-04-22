import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import AlertModal from './AlertModal'
import { createBrand } from '../../http/deviceAPI'

export default function CreateBrand({ show, onHide }) {
	const [alertH, setAlertH] = useState(false)
	const [value, setValue] = useState('')

	const addBrand = () => {
		createBrand({ name: value.trim() })
			.then(data => {
				setValue('')
				onHide()
			})
			.catch(err => console.log(err))
	}

	const onHideDecorator = func => {
		func()
		setValue('')
	}
	return (
		<Modal show={show} onHide={onHide} size='lg' centered backdrop='static' keyboard={false}>
			<Modal.Header>
				<Modal.Title>Добавить тип</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						placeholder='Введите название бренд'
						value={value}
						onChange={({ target }) => setValue(target.value)}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer className='d-flex justify-content-between'>
				<Button
					variant='outline-danger'
					onClick={() => {
						if (value.trim() !== '') setAlertH(true)
						else onHideDecorator(onHide)
					}}
				>
					Закрыть
				</Button>
				<Button variant='outline-success' onClick={addBrand}>
					Добавить
				</Button>
			</Modal.Footer>
			<AlertModal show={alertH} onHide={() => setAlertH(false)} callback={() => onHideDecorator(onHide)} />
		</Modal>
	)
}
