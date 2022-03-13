import React, { useContext, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { PostContext } from '../../contexts/PostContext'
const AddPostModal = () => {
    const { showAddModal, setShowAddModal, addPost, setShowToast } = useContext(PostContext)
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })
    const resetAddModal = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })
        setShowAddModal(false)
    }
    const onClose = () => {
        resetAddModal()
    }
    const { title, description, url } = newPost
    const onChangeInput = event => {
        setNewPost({
            ...newPost,
            [event.target.name]: event.target.value
        })
    }
    const onSubmit = async event => {
        event.preventDefault()
        const { success, message } = await addPost(newPost)
        resetAddModal()
        setShowToast({
            show: true, message, type: success ? 'success'
                : 'danger'
        })
    }

    return (
        <Modal show={showAddModal} onHide={onClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            onChange={onChangeInput}
                            type='text'
                            placeholder='Title'
                            name='title'
                            required
                            value={title}
                            aria-describedby='title-help'

                        />
                        <Form.Text id='title-help' muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-2'>
                        <Form.Control
                            onChange={onChangeInput}
                            as='textarea'
                            rows={3}
                            placeholder='Description'
                            name='description'
                            value={description}

                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            onChange={onChangeInput}
                            type='text'
                            placeholder='Youtube Tutorial URL'
                            name='url'
                            value={url}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant='primary' type='submit'>
                        LearnIt!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPostModal