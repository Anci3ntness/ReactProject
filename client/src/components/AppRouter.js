import React, { useContext } from 'react'
import { Route, Navigate, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { SHOP_ROUTE } from '../utils/constants'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'

export default observer(function AppRouter() {
	const { user } = useContext(Context)
	return (
		<Routes>
			{user.isAuth &&
				authRoutes.map(({ path, Component }) => {
					return <Route key={path} path={path} Component={Component} />
				})}
			{publicRoutes.map(({ path, Component }) => {
				return <Route key={path} path={path} Component={Component} />
			})}
			<Route path='*' element={<Navigate to={SHOP_ROUTE} />} />
		</Routes>
	)
})
