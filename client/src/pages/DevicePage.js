import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { fetchOneDevices } from '../http/deviceAPI'

export default function DevicePage() {
	const [device, setDevice] = useState({ info: [] })
	const [loading, setLoading] = useState(true)
	const { id } = useParams()

	useEffect(() => {
		fetchOneDevices(id)
			.then(data => setDevice(data))
			.finally(() => setLoading(false))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (loading) {
		return <Spinner animation='grow' />
	}

	return (
		<Container className='mt-3'>
			<Row className='media align-items-center'>
				<Col md={4} className='d-flex flex-column align-items-center '>
					<Image width={300} height={300} src={process.env.REACT_APP_API_URL + device?.img} />
				</Col>
				<Col md={4} className='d-flex flex-column align-items-center'>
					<h2>{device.name}</h2>
					<div style={{ position: 'relative', fontSize: 64 }}>
						<div
							className='d-flex align-items-center justify-content-center'
							style={{
								textAlign: 'center',
								width: 240,
								height: 240,
								textShadow: '1px 1px 10px white',
								backdropFilter: 'blur(1px)',
								borderRadius: '50%',
								background: 'rgba(255, 255, 0, 0.8)',
								clipPath:
									'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
								animation: '4s linear 0s infinite rotation',
							}}
						></div>
						<div
							style={{
								position: 'absolute',
								top: '50%',
								transform: 'translate(-50%, -50%)',
								left: '50%',
							}}
						>
							{device.rating}
						</div>
					</div>
				</Col>
				<Col md={4} className='d-flex flex-column align-items-center'>
					<Card
						className='d-flex flex-column align-items-center justify-content-around'
						style={{ width: 300, height: 300, fontSize: '32px', border: '5px solid lightgray' }}
					>
						<h3>От: {device.price} руб.</h3>
						<Button variant='outline-dark'>Добавить в корзину</Button>
					</Card>
				</Col>
			</Row>
			<Row className='d-flex flex-column m-3'>
				<h2>Характеристики</h2>
				{device.info.map((info, index) => (
					<Row
						className='p-2'
						key={info.id}
						style={{ background: index % 2 === 0 ? 'rgb(98, 218, 251)' : 'lightblue' }}
					>
						{info?.title}: {info?.description}
					</Row>
				))}
			</Row>
		</Container>
	)
}
