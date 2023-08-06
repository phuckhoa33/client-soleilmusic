import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../scss/footer.css';

const Footer = () => {
  return (
    <>
        <footer className="footer">
          <Container>
            <Row>
              <Col xs={12} md={6} className="mb-3">
                <h5>Liên hệ</h5>
                <p>Email: contact@example.com</p>
                <p>Điện thoại: 123-456-7890</p>
                <p>Địa chỉ: Đại lộ Vĩnh Trung, TP. Đà Nẵng</p>
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <h5>Theo dõi chúng tôi</h5>
                <p>Facebook</p>
                <p>Twitter</p>
                <p>Instagram</p>
              </Col>
            </Row>
          </Container>
          <div className="text-center p-3 bg-dark text-white">
            © 2023 Tên trang web dạy guitar. All rights reserved.
          </div>
        </footer>
    </>
  );
};

export default Footer;
