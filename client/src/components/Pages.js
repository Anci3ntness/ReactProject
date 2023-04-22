import React, { useContext } from 'react'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import { Pagination } from 'react-bootstrap'

export default observer(function Pages() {
	const { device } = useContext(Context)
	const pageCount = Math.ceil(device.totalCount / device.limit)
	const pages = []
	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1)
	}
	return (
		<Pagination>
			{pages.map(page => (
				<Pagination.Item
					style={{ cursor: 'pointer' }}
					active={device.page === page}
					onClick={() => device.setPage(page)}
					className='mt-5'
					key={page}
				>
					{page}
				</Pagination.Item>
			))}
		</Pagination>
	)
})
