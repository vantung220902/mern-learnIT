import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';

const About = () => {
    return (
        <Row className='mt-5' style={{marginRight:0}}> 
            <Col className="text-center">
                <Button variant='primary'
                    href='https://github.com/vantung220902'
                    size='lg'
                >
                    Visit my Facebook
                </Button>
            </Col>
        </Row>
    )
}

export default About