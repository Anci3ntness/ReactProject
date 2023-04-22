import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/constants'
import { registration, login } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import CustomModal from '../components/modals/CustomModal'

export default observer(function Auth() {
	const [navHeight, setNavHeight] = useState(0)
	const [mail, setMail] = useState('')
	const [password, setPassword] = useState('')
	const [modal, setModal] = useState(false)
	const [modalInfo, setModalInfo] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()
	const { user } = useContext(Context)

	const isLogin = location?.pathname === LOGIN_ROUTE
	useEffect(() => {
		const navbar = document.getElementById('g-navbar')
		if (navbar) setNavHeight(navbar.clientHeight)
	}, [])

	const authHandler = async () => {
		try {
			let data
			if (isLogin) {
				data = await login(mail, password)
			} else {
				data = await registration(mail, password)
			}
			user.setUser(data)
			user.setIsAuth(true)
			navigate(SHOP_ROUTE)
		} catch (err) {
			setModal(true)
			setModalInfo(err.response.data)
		}
	}

	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{ height: window.innerHeight - navHeight }}
		>
			<Card style={{ width: '50em' }} className='p-5'>
				<h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
				<Form className='d-flex flex-column'>
					<Form.Control
						value={mail}
						className='mt-3'
						placeholder='Введите почту'
						onChange={({ target }) => setMail(target?.value)}
					/>
					<Form.Control
						type='password'
						value={password}
						className='mt-3'
						placeholder='Введите пароль'
						onChange={({ target }) => setPassword(target?.value)}
					/>
					<Form.Group className='d-flex justify-content-between alig-items-center mt-3'>
						{isLogin ? (
							<div>
								Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
							</div>
						) : (
							<div>
								Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}>Авторизируйтесь!</NavLink>
							</div>
						)}
						<Button variant={'outline-success'} onClick={authHandler}>
							{isLogin ? 'Войти' : 'Зарегистрироваться'}
						</Button>
					</Form.Group>
				</Form>
			</Card>
			<CustomModal
				show={modal}
				onHide={() => setModal(false)}
				title='Произошла ошибка'
				description={modalInfo.message}
				button='Закрыть'
			/>
		</Container>
	)
})
