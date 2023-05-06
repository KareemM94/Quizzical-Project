import "./IntroPage.css";

function Intro(props) {
  return (
    <div className="intro-container">
      <h1 className="intro-header">Quizzical</h1>
      <button className="intro-button" onClick={props.onClose}>
        Start Quiz
      </button>
      <p className="intro-description">Created by Kareem Mohamed</p>
    </div>
  );
}

export default Intro;
