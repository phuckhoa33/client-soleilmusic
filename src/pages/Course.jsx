import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../scss/profile.css';
import { useNavigate, useParams } from 'react-router-dom';
import { enroll, getCourse, get_all_video_course } from '../api/store';
import { useUserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

function Course() {
  const {id} = useParams();
  const {user} = useUserContext();
  const navigate = useNavigate();
  const [course, setCourse] = useState({});
  const [videoCourses, setVideoCourses] = useState([]);

  useEffect(() => {
    const fetchDataCourse = async() => {
      const getCourseProcess = await getCourse(id);
      const getVideoCoursesProcess = await get_all_video_course(id);

      Promise.all([getCourseProcess, getVideoCoursesProcess]);

      setCourse(getCourseProcess.data.result);
      setVideoCourses(getVideoCoursesProcess.data.result);
    }

    fetchDataCourse();
  }, [])

  const handleEnrollCourse = async() => {
    if(user!=={}){
      const formEnroll = {
        user_id: user['code'], 
        course_id: id
      }
      const {data} = await enroll(formEnroll);
      if(data.result.statusCode!==202){
        toast.warn("Khoa hoc da duoc ban dang ky")
      }
      navigate(`/learning/${id}/${user['code']}`);
     }
     else {
       navigate('/authentication')
     }
    }

  return (
    
    <div className="course-intro">
      <Container>
        <Row>
          {/* Course Information */}
          <Col md={8}>
            <h1 className="course-title">{course.course_title}</h1>
            
            <div className="course-info">
              <p><strong>Số lượng bài học:</strong> {videoCourses.length} bài</p>
              <p><strong>Số lượng bài kiểm tra:</strong> 0 bài</p>
              <p><strong>Người đứng lớp:</strong> {course.course_author}</p>
              <Button variant="primary" size="lg" onClick={handleEnrollCourse} className="join-btn">Tham gia khóa học</Button>
            </div>
            <h2>Mục lục khóa học</h2>
            <div className="course-outline-container">
              <ul className="course-outline">
                {videoCourses.map(videoCourse => (
                  <li>
                    {videoCourse.video_title}
                  </li>
                ))}
              </ul>
            </div>
            <h2>Miêu tả khóa học</h2>
            <Row>
              <p className="course-description">{course.course_desc}</p>
            </Row>
          </Col>
          {/* Course Image */}
          <Col md={4}>
            <Card className="course-image">
              <Card.Img variant="top" src={course.course_image}/>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Course;
