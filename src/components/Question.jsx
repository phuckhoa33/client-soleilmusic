import React from 'react';
import { Form } from 'react-bootstrap';

const Question = ({ question, options, selectedOption, onOptionChange }) => {
  return (
    <div>
      <h5>{question}</h5>
      <Form.Group>
        {options.map((option, index) => (
          <Form.Check
            key={index}
            type="radio"
            label={option}
            name={`question-${index}`}
            value={index}
            checked={selectedOption === index}
            onChange={() => onOptionChange(index)}
          />
        ))}
      </Form.Group>
    </div>
  );
};

export default Question;
