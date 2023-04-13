import React, { useContext } from 'react'

import { observer } from 'mobx-react-lite'
import DeviceItem from './DeviceItem'
import { CardGroup } from 'react-bootstrap'
import { Context } from '..'

export default observer(function DeviceList() {
	const { device } = useContext(Context)
	return (
		<CardGroup className='d-flex gap-5 mt-3'>
			{device.devices.map(item => (
				<DeviceItem key={item?.id ?? ''} device={item} />
			))}
		</CardGroup>
	)
})
