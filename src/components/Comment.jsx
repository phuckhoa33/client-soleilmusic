import React, { useContext, useEffect, useState } from 'react';
import { Image, ListGroup } from 'react-bootstrap';
import { get_user } from '../api/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPerson } from '@fortawesome/free-solid-svg-icons'
import { useUserContext } from '../context/UserContext';
import { CommentContext } from '../context/CommentContext';
import { SubComment } from './SubComment';

export const Comment = ({ user_id, comment, replies, comment_id }) => {
  const  [account, setAccount] = useState({});
  const {user} = useUserContext();
  const {deleteComment, setReplyer} = useContext(CommentContext);
  useEffect(() => {
    handleDataUser();
  }, [account])

  const handleDataUser = async() => {
    const {data} = await get_user(user_id);
    setAccount({...data.result.user});
  }

  const hanldeDelete = async() => {
    await deleteComment(comment_id)
  }

  const handleReply = () => {
    setReplyer({
      name_account: account.first_name===""?account.email:account.first_name+""+account.last_name,
      comment_id,
    })
  }


  return (
  
    <ListGroup.Item>
      <div style={{float: "right", cursor: "pointer"}}>
          
        {user.code!==user_id?(
          <FontAwesomeIcon onClick={handleReply} icon={faPen}/>
        ): (
            
          <FontAwesomeIcon onClick={hanldeDelete} icon={faTrash}/>
        )}
      </div>
      {account.image!==""?(
        <Image width={50} src={account.image}/>

      ): (
        <FontAwesomeIcon width={30} icon={faPerson}/>
      )}
      <strong>{account.first_name===""?account.email:account.first_name+""+account.last_name}</strong>: {comment}
      {replies?.length>0 && (
        <ListGroup variant="flush">
          {replies.map((sub, index) => (
            <Comment {...sub}/>
          ))}
        </ListGroup>  
      )}
    </ListGroup.Item>
)};

export default Comment;
