import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import CreateType from '../components/modals/CreateType'

export default function Admin() {
	const [showType, setShowType] = useState(false)
	const [showBrand, setShowBrand] = useState(false)
	const [showDevice, setShowDevice] = useState(false)
	return (
		<Container className='d-flex flex-column'>
			<Button variant='outline-dark' className='mt-3 p-2' onClick={() => setShowType(true)}>
				Добавить тип
			</Button>
			<Button variant='outline-dark' className='mt-3 p-2' onClick={() => setShowBrand(true)}>
				Добавить бренд
			</Button>
			<Button variant='outline-dark' className='mt-3 p-2' onClick={() => setShowDevice(true)}>
				Добавить девайс
			</Button>

			<CreateType show={showType} onHide={() => setShowType(false)} />
			<CreateBrand show={showBrand} onHide={() => setShowBrand(false)} />
			<CreateDevice show={showDevice} onHide={() => setShowDevice(false)} />
		</Container>
	)
}
