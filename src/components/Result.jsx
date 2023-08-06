import React from 'react';
import { Container } from 'react-bootstrap';

const Result = ({ score, totalQuestions }) => {
  const calculateGrade = (score) => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 90) return 'Xuất sắc';
    if (percentage >= 70) return 'Giỏi';
    if (percentage >= 50) return 'Khá';
    return 'Trung bình';
  };

  return (
    <Container>
      <h1 className="text-center my-4">Kết quả</h1>
      <p className="text-center">Số câu đúng: {score}</p>
      <p className="text-center">Tổng số câu hỏi: {totalQuestions}</p>
      <p className="text-center">Điểm số: {score}/{totalQuestions}</p>
      <p className="text-center">Mức độ: {calculateGrade(score)}</p>
    </Container>
  );
};

export default Result;
