import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import { observer } from 'mobx-react-lite'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI'
import { Context } from '..'
import Pages from '../components/Pages'

export default observer(function Shop() {
	const { device } = useContext(Context)
	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data))
		fetchBrands().then(data => device.setBrands(data))
		fetchDevices(null, null, device.page, device.limit).then(data => {
			device.setDevices(data?.rows)
			device.setTotalCount(data?.count)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	useEffect(() => {
		fetchDevices(device.selectedType?.id, device.selectedBrand?.id, device.page, device.limit).then(data => {
			console.log(data)
			device.setDevices(data?.rows)
			device.setTotalCount(data?.count)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [device.page, device.selectedType, device.selectedBrand])

	return (
		<Container>
			<Row className='mt-3'>
				<Col md={3}>
					<TypeBar />
				</Col>
				<Col md={9}>
					<BrandBar />
					<DeviceList />
					<Pages />
				</Col>
			</Row>
		</Container>
	)
})
