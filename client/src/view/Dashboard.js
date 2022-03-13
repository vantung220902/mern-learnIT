import React, { useContext, useEffect } from 'react'
import { PostContext } from '../contexts/PostContext'
import { Button, Card, Spinner, Row, Col, OverlayTrigger, Tooltip, Toast } from 'react-bootstrap'
import { AuthContext } from './../contexts/AuthContext'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import addIcon from '../assets/plus-circle-fill.svg'
import UpdatePostModal from '../components/posts/UpdatePostModal'
const Dashboard = () => {
  const { postState: { posts, postsLoading, post }, getPosts, setShowAddModal, showToast, setShowToast } = useContext(PostContext)
  const { authState: { user: { username } } } = useContext(AuthContext)
  //Start: get all posts
  useEffect(() => {
    getPosts()
  }, [])
  let body = null
  //check loading post
  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation='border' variant='info' />
      </div>
    )
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className='text-center mx-5 my-5'>
          <Card.Header as='h1'>
            Hi {username}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Welcome to LearnIt
            </Card.Title>
            <Card.Text>
              Click the button below to track  your first skill learn
            </Card.Text>
            <Button variant='primary' onClick={setShowAddModal.bind(this, true)} >
              LearnIt!
            </Button>
          </Card.Body>
        </Card>
      </>
    )
  } else {

    body = (<>
      <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
        {
          posts.map(post => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))
        }
      </Row>
      {/* Open Add Modal  */}
      <OverlayTrigger placement='left' overlay={<Tooltip>
        Add a new thing to learn
      </Tooltip>}>

        <Button className="btn-floating" onClick={setShowAddModal.bind(this, true)}>
          <img src={addIcon} alt="Add" width={60} height={60} />
        </Button>
      </OverlayTrigger>
    </>)
  }
  return (
    <>
      {body}
      <Toast show={showToast.show} style={{ position: 'fixed', to: '20%', right: '10px' }}
        className={`bg-${showToast.type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: '',
          type: null
        })

        }
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>
            {showToast.message}
          </strong>
        </Toast.Body>
      </Toast>
      <AddPostModal />
      {
        post !== null && <UpdatePostModal />
      }
    </>
  )
}

export default Dashboard