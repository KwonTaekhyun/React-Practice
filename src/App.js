import "./styles.css";
import { useState } from "react";

export default function App() {
  const titleForStartPage = "Do you wanna start a Quiz?";
  const titleForEndPage = "Do you wanna restart a Quiz?";

  const [gameState, setGameState] = useState("idle");
  const [quizIndex, setQuizIndex] = useState(0);
  const [correctNum, setCorrectNum] = useState(0);

  const quizData = [
    { word: "paramount", meaning: "최고의" },
    { word: "morning", meaning: "아침" },
    { word: "dinner", meaning: "저녁" },
    { word: "parole", meaning: "가석방" },
    { word: "jeopardy", meaning: "무언가를 잃을 위험" },
    { word: "success", meaning: "성공" }
  ];

  const startGame = (e) => {
    setQuizIndex(0);
    setCorrectNum(0);
    setGameState("onGoing");
  };

  const endGame = (e) => {
    setGameState("ended");
  };

  const restartGame = (e) => {
    setQuizIndex(0);
    setCorrectNum(0);
    setGameState("onGoing");
  };

  const checkAnswer = (submittedAnswer) => {
    const answer = quizData[quizIndex].meaning;

    if (submittedAnswer === answer) {
      setQuizIndex(quizIndex + 1);
      setCorrectNum(correctNum + 1);

      alert("정답");
    } else {
      setQuizIndex(quizIndex + 1);

      alert("오답");
    }
  };

  const StartBlock = () => {
    return (
      <>
        <span>{titleForStartPage}</span>
        <br />
        <button onClick={(e) => startGame(e)}>start</button>
        <br />
      </>
    );
  };

  const GameBlock = () => {
    const options = () => {
      // quizIndex를 포함한 4개의 임의의 index 추출 (1 ~ quizData.length) -> suffle
      var randomNums = [quizIndex];

      while (randomNums.length < 4) {
        const randomNum = Math.floor(Math.random() * 5);

        if (randomNums.includes(randomNum)) continue;
        else randomNums.push(randomNum);
      }

      randomNums.sort(() => Math.random() - 0.5);

      return [
        quizData[randomNums[0]].meaning,
        quizData[randomNums[1]].meaning,
        quizData[randomNums[2]].meaning,
        quizData[randomNums[3]].meaning
      ];
    };

    return (
      <>
        {quizIndex < quizData.length ? (
          <>
            <span>{quizData[quizIndex].word} </span>
            <span>
              {quizIndex + 1}/{quizData.length}
            </span>
            <br />
            <br />

            <div>
              {options().map((value, index) => {
                return (
                  <div onClick={(e) => checkAnswer(value)}>
                    {index + 1}. {value}
                  </div>
                );
              })}
            </div>

            <br />
            <button onClick={(e) => endGame(e)}>exit</button>
            <br />
          </>
        ) : (
          <>
            <span>
              Your Score: {correctNum} / {quizData.length}
            </span>
            <br />
            <button onClick={(e) => endGame(e)}>end</button>
            <br />
          </>
        )}
      </>
    );
  };

  const EndBlock = () => {
    return (
      <>
        <span>{titleForEndPage}</span>
        <br />
        <button onClick={(e) => restartGame(e)}>restart</button>
        <br />
      </>
    );
  };

  return (
    <>
      {gameState === "idle" && <StartBlock />}
      {gameState === "onGoing" && <GameBlock />}
      {gameState === "ended" && <EndBlock />}
    </>
  );
}
