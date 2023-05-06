import Intro from "./IntroPage";
import QuestionsPage from "./QuestionsPage";
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [showIntro, SetShowIntro] = useState(true);

  const closeIntro = () => {
    SetShowIntro(false);
  };

  return showIntro ? <Intro onClose={closeIntro} /> : <QuestionsPage />;
};
export default App;
