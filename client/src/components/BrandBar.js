import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '..'
import { Card } from 'react-bootstrap'

export default observer(function BrandBar() {
	const { device } = useContext(Context)
	return (
		<div className='d-flex flex-wrap gap-2'>
			{device.brands.map(brand => (
				<Card
					className='d-block p-3'
					style={{
						cursor: 'pointer',
						transition: 'border-color 150ms ease-out',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						maxWidth: '10em',
					}}
					border={brand?.id === device.selectedBrand?.id ? 'success' : 'light'}
					key={brand?.id}
					onClick={() => device.setSelectedBrand(brand)}
				>
					{brand?.name}
				</Card>
			))}
		</div>
	)
})
