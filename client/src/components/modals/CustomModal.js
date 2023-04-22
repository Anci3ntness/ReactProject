import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function CustomModal({ show, onHide, title, description, button }) {
	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{description}</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-dark' onClick={onHide}>
					{button}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
