import React from "react";
import "./Quiz.css";
import { data } from "../../data";
import { useState } from "react";
import { useRef } from "react";

function Quiz() {
  const [index, setindex] = useState(0);
  const [question, setquestion] = useState(data[index]);
  const [lock, setlock] = useState(false);
  const [score, setscore] = useState(0);
  const [result, setresult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  const All_arry = [option1, option2, option3, option4];

  const checkanswer = (e, ans) => {
    if (lock == false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setlock(true);
        setscore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setlock(true);
        All_arry[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  let btn = () => {
    if (index === data.length - 1) {
      setresult(true);
      return 0;
    }
    if (lock === true) {
      setindex(index + 1);
      setquestion(data[index]);
      setlock(false);
      All_arry.map((option) => {
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
        return null;
      });
    }
  };

  const reset = () => {
    setindex(0);
    setquestion(data[0]);
    setlock(false);
    setscore(0);
    setresult(false);
  };

  return (
    <>
      <div className="Container">
        <h1>Quiz App</h1>
        <hr />
        {result ? (
          <></>
        ) : (
          <>
            <h2>
              {index + 1}.{question.question}
            </h2>
            <ul>
              <li ref={option1} onClick={(e) => checkanswer(e, 1)}>
                {question.option1}
              </li>
              <li ref={option2} onClick={(e) => checkanswer(e, 2)}>
                {question.option2}
              </li>
              <li ref={option3} onClick={(e) => checkanswer(e, 3)}>
                {question.option3}
              </li>
              <li ref={option4} onClick={(e) => checkanswer(e, 4)}>
                {question.option4}
              </li>
            </ul>
            <button onClick={btn}>Next</button>
            <div className="index">
              {index + 1} of {data.length} question
            </div>
          </>
        )}
        {result ? (
          <>
            <h2>
              you scored {score} out of {data.length}
            </h2>
            <button onClick={reset}>Reset</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
export default Quiz;
