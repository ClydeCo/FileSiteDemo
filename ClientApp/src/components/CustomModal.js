import React from 'react';
import Modal from 'react-bootstrap/Modal'
import 'font-awesome/css/font-awesome.min.css';


const CustomModal = props => (
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {props.modalTitle}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>{props.bodyTitle}</h4>
            <p>
                {props.bodyText}
            </p>
        </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-success" onClick={props.onConfirm}>Confirm</button>
            <button className="btn btn-primary" onClick={props.onHide}>Close</button>
        </Modal.Footer>
    </Modal>
)

export default CustomModal;