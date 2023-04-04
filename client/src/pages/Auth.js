import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/constants'

export default function Auth() {
	const [navHeight, setNavHeight] = useState(0)
	const location = useLocation()
	const isLogging = location?.pathname === LOGIN_ROUTE
	useEffect(() => {
		const navbar = document.getElementById('g-navbar')
		if (navbar) setNavHeight(navbar.clientHeight)
	}, [])

	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{ height: window.innerHeight - navHeight }}
		>
			<Card style={{ width: '50em' }} className='p-5'>
				<h2 className='m-auto'>{isLogging ? 'Авторизация' : 'Регистрация'}</h2>
				<Form className='d-flex flex-column'>
					<Form.Control className='mt-3' placeholder='Введите почту' />
					<Form.Control className='mt-3' placeholder='Введите пароль' />
					<Form.Group className='d-flex justify-content-between alig-items-center mt-3'>
						{isLogging ? (
							<div>
								Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
							</div>
						) : (
							<div>
								Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}>Авторизируйтесь!</NavLink>
							</div>
						)}
						<Button variant={'outline-success'}>{isLogging ? 'Войти' : 'Зарегистрироваться'}</Button>
					</Form.Group>
				</Form>
			</Card>
		</Container>
	)
}
