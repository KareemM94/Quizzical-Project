import React, { useState, useEffect } from "react";
import Question from "./Questions";
import { v4 as uuidv4 } from "uuid";
import "./QuestionsPage.css";

const QuestionsPage = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [questionsAnswered, setQuestionsAnswered] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState();


  const loadQuestions = () => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        setQuestionsData(
          data.results.map((result) => ({ ...result, id: uuidv4() }))
        );
      })
  }

  useEffect(() => {
    
    loadQuestions()
      ;
  }, []);

  const onQuestionAnswered = (id, isCorrect) => {
    setQuestionsAnswered({ ...questionsAnswered, [id]: isCorrect });
  };

  const questionElements = questionsData.map((questionData) => (
    <Question
      onQuestionAnswered={onQuestionAnswered}
      question={questionData.question}
      incorrectAnswers={questionData.incorrect_answers}
      correctAnswer={questionData.correct_answer}
      key={questionData.id}
      isSubmitted={isSubmitted}
      id={questionData.id}
    />
  ));

  const answerHandler = () => {
    setFinalScore(Object.values(questionsAnswered).filter((c) => c === true));
    setIsSubmitted(true);
  };


  const allNewQuestions = () => {

    if (!isSubmitted) {
      return answerHandler()
    } else {
      setIsSubmitted(false)
      setQuestionsAnswered({})
      return loadQuestions()
      
    }

  }

  return (
    <>
      {questionElements}
      <div className="bottom_text">
        {isSubmitted && (
          <p>You scored {finalScore.length} /5 correct answers</p>
        )}
        <button
          className={Object.keys(questionsAnswered).length !== 5 ? "disabledBtn submit_button" : "submit_button"}
          onClick={allNewQuestions}
        >
          {isSubmitted ? "Play Again" : "Check Answers"}
        </button>
      </div>
    </>
  );
};

export default QuestionsPage;
