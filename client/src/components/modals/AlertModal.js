import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function AlertModal({ show, onHide, callback }) {
	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Вы уверены, что хотите закрыть форму?</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Закрытие формы приведёт к утрате введённых данных! <br />
				Все равно закрыть?
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-success' onClick={onHide}>
					Остаться
				</Button>
				<Button
					variant='outline-danger'
					onClick={() => {
						onHide()
						callback()
					}}
				>
					Закрыть
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
