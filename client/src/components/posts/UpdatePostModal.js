import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { PostContext } from '../../contexts/PostContext'
const UpdatePostModal = () => {
    const { setShowUpdateModal, showUpdateModal, setShowToast, updatePost, postState: { post } } = useContext(PostContext)
    const [updatedPost, setUpdatePost] = useState(post)
    const onClose = () => {
        setShowUpdateModal(false)
        setUpdatePost(post)
    }
    const { title, description, url, status } = updatedPost
    const onChangeInput = event => {
        setUpdatePost({
            ...updatedPost,
            [event.target.name]: event.target.value
        })
    }
    const onSubmit = async event => {
        event.preventDefault()
        const { success, message } = await updatePost(updatedPost)
        onClose()
        setShowToast({
            show: true, message, type: success ? 'success'
                : 'danger'
        })
    }
    useEffect(() => {
        setUpdatePost(post)
    }, [post])
    return (
        <Modal show={showUpdateModal} onHide={onClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Making progress?</Modal.Title>
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
                    <Form.Group className='mb-3'>
                        <Form.Control
                            onChange={onChangeInput}
                            type='text'
                            placeholder='Youtube Tutorial URL'
                            name='url'
                            value={url}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as={'select'}
                            onChange={onChangeInput}
                            name='status'
                            value={status}
                        >
                            <option value="TO LEARN">
                                TO LEARN
                            </option>
                            <option value="LEARNING">
                                LEARNING
                            </option>
                            <option value="LEARNED">
                                LEARNED
                            </option>
                        </Form.Control>

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

export default UpdatePostModal