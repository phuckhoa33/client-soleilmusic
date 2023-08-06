import React, { useState } from 'react';
import { Container, Row, Col, Nav, Form, Button } from 'react-bootstrap';
import '../scss/profile.css';
import UserProfile from '../components/UserProfile';

function Profile() {
  const [activeTab, setActiveTab] = useState('personalInfo');

  const handleNavTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="dashboard">
      <Container fluid>
        <Row style={{}}>
          {/* Sidebar */}
          <Col xs={2} className="sidebar">
            <Nav className="flex-column">
              <Nav.Link active={activeTab === 'personalInfo'} onClick={() => handleNavTabClick('personalInfo')}>
                Thông tin cá nhân
              </Nav.Link>
              <Nav.Link active={activeTab === 'timeAnalysis'} onClick={() => handleNavTabClick('timeAnalysis')}>
                Phân tích thời gian học
              </Nav.Link>
              <Nav.Link active={activeTab === 'completedCourses'} onClick={() => handleNavTabClick('completedCourses')}>
                Các khóa đã hoàn thành
              </Nav.Link>
              <Nav.Link active={activeTab === 'points'} onClick={() => handleNavTabClick('points')}>
                Điểm
              </Nav.Link>
            </Nav>
          </Col>
          {/* Main Content */}
          <Col xs={10} className="main-content">
            {activeTab === 'personalInfo' && (
              <div>
                <h2>Thông tin cá nhân</h2>
                <UserProfile/>
              </div>
            )}
            {activeTab === 'timeAnalysis' && (
              <div>
                <h2>Phân tích thời gian học</h2>
                {/* Time analysis content */}
              </div>
            )}
            {activeTab === 'completedCourses' && (
              <div>
                <h2>Các khóa đã hoàn thành</h2>
                {/* Display completed courses */}
              </div>
            )}
            {activeTab === 'points' && (
              <div>
                <h2>Điểm</h2>
                {/* Display points */}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;