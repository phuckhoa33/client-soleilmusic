import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, ListGroup, Button } from 'react-bootstrap';
import '../scss/comment.css';
import Comment from "./Comment";
import { CommentContext } from "../context/CommentContext";
import generateRandomNumber from "../extra/generate_random_id";
import { useUserContext } from "../context/UserContext";

const CommentSection = ({course_id, user_id, active}) => {
    const {addComment, fetchData, comments, replyer, replyComment, handleReplyer, setReplyer} = useContext(CommentContext);
    const [comment, setComment] = useState('');
    const {user} = useUserContext();
    useEffect(() => {
      fetchData();
      return () => {};
    }, [active])

    useEffect(() => {
      handleReplyer(setComment, comment);
      return () => {}
    }, [replyer])
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      if(!comment.includes("@")){
        if (comment.trim() !== '') {
          const newComment = {
            user_id, // Tạm thời để là "User", bạn có thể thêm tính năng đăng nhập để lấy tên người dùng thực tế
            course_id,
            comment,
            replies: [],
            comment_id: generateRandomNumber()
          };
          await addComment(newComment);
        }
      }
      else {
        const reply_comment = {
          comment_id: replyer.comment_id,
          reply: {
            user_id,
            comment: comment.split(" ").splice(1).join(" ").trim()
          }
        }

        await replyComment(reply_comment);
      }

      setComment("");
    };

    const handleChange = (e) => {
      setComment(e.target.value);
    }
  
    return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="commentForm">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Write your comment here..."
                  value={comment}
                  onChange={handleChange}
                />
                <Button onClick={handleSubmit}>Bình Luận</Button> 
              </Form.Group>
            </Form>
            <ListGroup variant="flush" className="mt-3">
              {comments.length>0&&(
                <>
                  {comments.map((comment) => (
                    <>
                      <Comment {...comment}/>
                    </>
                  ))}
                </>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
};

export default CommentSection;