import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Question from '../components/Question';
import Result from '../components/Result';

const questions = [
  {
    question: 'Câu hỏi 1?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
  },
  // Thêm các câu hỏi tiếp theo tương tự
];

const Quiz = () => {
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const handleOptionChange = (questionIndex, selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedOption;
    setAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    setShowResult(true);
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        score++;
      }
    });
    return score;
  };

  return (
    <Container>
      <h1 className="text-center my-4">Quiz về kiến thức guitar</h1>
      {!showResult ? (
        <div>
          <Row>
            <Col md={8} className="mx-auto">
              {questions.map((question, index) => (
                <Question
                  key={index}
                  question={question.question}
                  options={question.options}
                  selectedOption={answers[index]}
                  onOptionChange={(selectedOption) => handleOptionChange(index, selectedOption)}
                />
              ))}
            </Col>
          </Row>
          <div className="text-center my-4">
            <Button onClick={handleSubmitQuiz}>Nộp bài</Button>
          </div>
        </div>
      ) : (
        <Result score={calculateScore()} totalQuestions={questions.length} />
      )}
    </Container>
  );
};

export default Quiz;
