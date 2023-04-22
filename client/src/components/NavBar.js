import React, { useContext } from 'react'
import { Context } from '..'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/constants'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
export default observer(function NavBar() {
	const navigate = useNavigate()
	const { user } = useContext(Context)

	return (
		<Navbar className='p-2 justify-content-between' bg='dark' variant='dark' id='g-navbar'>
			<Container>
				<NavLink to={SHOP_ROUTE} className='navbar-brand'>
					КупиДевайс
				</NavLink>
				{user.isAuth ? (
					<Nav className='text-white '>
						<Button variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)}>
							Админ панель
						</Button>
						<Button
							variant={'outline-light'}
							style={{ marginLeft: '1em' }}
							onClick={() => {
								localStorage.removeItem('token')
								user.setIsAuth(false)
								user.setUser()
							}}
						>
							Выйти
						</Button>
					</Nav>
				) : (
					<Nav className='text-white'>
						<Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>
							Авторизация
						</Button>
					</Nav>
				)}
			</Container>
		</Navbar>
	)
})
