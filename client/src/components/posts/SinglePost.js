import React from 'react'
import { Card, Row, Col, Badge } from 'react-bootstrap'
import ActionButtons from './ActionButtons'

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
    const checkStatus = () => {
        switch (status) {
            case 'LEARNED':
                return 'success'
            case 'LEARNING':
                return 'warning'
            default: return 'danger'
        }
    }
   
    return (
        <Card className='shadow' border={checkStatus()}>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className='post-title'>{title}</p>
                            <Badge pill variant={checkStatus()}>
                                {status}
                            </Badge>
                        </Col>
                        <Col className='text-right'>
                            <ActionButtons url={url} _id={_id}>
                            </ActionButtons>
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SinglePost