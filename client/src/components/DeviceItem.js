import React from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/constants'
import template from '../assets/logo192.png'
export default function DeviceItem({ device }) {
	return (
		<NavLink to={DEVICE_ROUTE + '/' + device?.id} style={{ textDecoration: 'unset' }}>
			<Col md={3}>
				<Card style={{ cursor: 'pointer', width: 150, borderRadius: '0.3em' }} border='white'>
					<Image
						className='bg-white bg-blur'
						width={150}
						height={150}
						src={device?.img}
						style={{
							objectFit: 'contain',
							objectPosition: '50% 50%',
							backgroundImage: `url(${device.img})`,
							backgroundPosition: '50% 50%',
							borderRadius: '0.3em',
						}}
					/>
					<div className='d-flex justify-content-between gap-2 mt-1'>
						<div
							className='text-black-50'
							style={{
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
						>
							{device?.name}
						</div>
						<div className='d-flex justify-content-end align-items-center gap-2 '>
							<div>{device?.rating}</div>
							<Image width={16} height={16} src={template} />
						</div>
					</div>
					<div
						style={{
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{device?.name}
					</div>
				</Card>
			</Col>
		</NavLink>
	)
}
