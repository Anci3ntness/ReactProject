import React, { useContext } from 'react'
import { Context } from '..'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { SHOP_ROUTE } from '../utils/constants'
import { observer } from 'mobx-react-lite'

export default observer(function NavBar() {
	const { user } = useContext(Context)
	return (
		<Navbar className='p-2 justify-content-between' bg='dark' variant='dark' id='g-navbar'>
			<Container>
				<NavLink to={SHOP_ROUTE} className='navbar-brand'>
					КупиДевайс
				</NavLink>
				{user.isAuth ? (
					<Nav className='text-white '>
						<Button variant={'outline-light'}>Админ панель</Button>
						<Button
							variant={'outline-light'}
							style={{ marginLeft: '1em' }}
							onClick={() => user.setIsAuth(false)}
						>
							Профиль
						</Button>
					</Nav>
				) : (
					<Nav className='text-white'>
						<Button variant={'outline-light'} onClick={() => user.setIsAuth(true)}>
							Авторизация
						</Button>
					</Nav>
				)}
			</Container>
		</Navbar>
	)
})
