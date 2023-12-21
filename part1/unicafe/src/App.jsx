import { useState } from "react";

const Button = ({ text, onComent }) => {
  return <button onClick={onComent}>{text}</button>;
};

const StatisticLine = ({ name, cant }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{cant}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <h1>Statisties</h1>
      {good + bad + neutral === 0 ? (
        <p>No feedbak givem</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine name="Good" cant={good}></StatisticLine>
            <StatisticLine name="Neutral" cant={neutral}></StatisticLine>
            <StatisticLine name="Bad" cant={bad}></StatisticLine>
            <StatisticLine
              name="All coments"
              cant={good + neutral + bad}
            ></StatisticLine>
            <StatisticLine
              name="Average score"
              cant={good - bad}
            ></StatisticLine>
            <StatisticLine
              name="Positive"
              cant={good && (100 * good) / (good + neutral + bad) +'%'}
            ></StatisticLine>
          </tbody>
        </table>
      )}
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onComentGood = () => {
    setGood(good + 1);
  };
  const onComentNeutal = () => {
    setNeutral(neutral + 1);
  };
  const onComentBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button text="Good" onComent={onComentGood}></Button>
        <Button text="Neutral" onComent={onComentNeutal}></Button>
        <Button text="Bad" onComent={onComentBad}></Button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

export default App;
