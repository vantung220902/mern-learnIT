import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { PostContext } from './../../contexts/PostContext';
const ActionButtons = ({ url, _id }) => {
    const { deletePost, setShowToast, findPost, setShowUpdateModal } = useContext(PostContext)
    const onDelete = async _id => {
        const { success, message } = await deletePost(_id)
        setShowToast({
            show: true, message, type: success ? 'success'
                : 'danger'
        })
    }
    const onUpdate = _id => {
        findPost(_id)
        setShowUpdateModal(true)
    }
    return (
        <>
            <Button className="post-button" href={url} target='_blank'>
                <img src={playIcon} alt="play" width={32} height={32} />
            </Button>
            <Button className="post-button" >
                <img src={editIcon} alt="Edit" width={24} height={24} onClick={onUpdate.bind(this,_id)} />
            </Button>
            <Button className="post-button" onClick={onDelete.bind(this, _id)}>
                <img src={deleteIcon} alt="delete" width={24} height={24} />
            </Button>
        </>
    )
}

export default ActionButtons