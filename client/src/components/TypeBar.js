import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '..'
import { ListGroup } from 'react-bootstrap'

export default observer(function TypeBar() {
	const { device } = useContext(Context)
	return (
		<ListGroup>
			{device.types.map(type => (
				<ListGroup.Item
					style={{
						cursor: 'pointer',
						transition:
							'color 150ms ease-out, border-color 150ms ease-out, background-color 150ms ease-out',
					}}
					active={type?.id === device.selectedType.id}
					key={type?.id}
					onClick={() => device.setSelectedType(type)}
				>
					{type?.name}
				</ListGroup.Item>
			))}
		</ListGroup>
	)
})
