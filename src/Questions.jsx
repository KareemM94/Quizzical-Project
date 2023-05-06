import decode from "html-entities-decoder";
import { useEffect, useState } from "react";
import { shuffle } from "./utils";
import { v4 as uuidv4 } from "uuid";
import "./Questions.css";

function Question(props) {
  const [allAnswers, setAllAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");


  useEffect(() => {
    const shuffledAnswers = shuffle([
      ...props.incorrectAnswers.map((incorrectAnswer) =>
        decode(incorrectAnswer)
      ),
      decode(props.correctAnswer),
    ]);
    setAllAnswers(shuffledAnswers);
  }, [props.correctAnswer, props.incorrectAnswers]);




  const onAnswerSelected = (answer) => {
    let isCorrect = decode(props.correctAnswer) === answer
    props.onQuestionAnswered(props.id, isCorrect)
    setSelectedAnswer(answer);
  };


 


  const getClassName = (answer) => {
    let classNameArr = [];

    if (props.isSubmitted) {
      if (answer === decode(props.correctAnswer)) {
        classNameArr.push('correct')
      } else {
        if (answer === selectedAnswer && answer !== decode(props.correctAnswer)) {
          classNameArr.push('incorrect')
        } else {
          classNameArr.push('neutral');
        }
      }
    }

    if (answer === selectedAnswer) {
      classNameArr.push('selected');
    } 
    
    return classNameArr.join(' ');
    
    
  }
  
  
  return (
    <div className="question_container">
      <h1>{decode(props.question)}</h1>
      <div className="answers_container">
        {allAnswers.map((answer) => (
          <span
            key={uuidv4()}
            onClick={() => onAnswerSelected(answer)}
            className={getClassName(answer)}
          >
            {answer}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Question;
