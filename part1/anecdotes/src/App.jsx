import { useState } from "react"

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [maxVote, setMaxVote] = useState(0)

  const onNext = ()=>{
    setSelected(Math.floor(Math.random() * (anecdotes.length- 1)))
  }
  const getMax = (maxIndex, currentValue,currentIndex) => {
    if (currentValue > votes[maxIndex]) return currentIndex;
    return maxIndex;
  }
  const onVote = ()=>{
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
    
    const indexMaxValue = newVotes.reduce(getMax,maxVote)
    console.log(indexMaxValue)
    setMaxVote(indexMaxValue)
    console.log(newVotes)
    
  }
  

  return (
    <>
    <h1>Anegote od the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>Votes: {votes[selected]}</div>
      <button onClick={onVote}>vote</button>
      <button onClick={onNext}>next anecdote</button>

      <h1>Anegote wih most votes</h1>
      <div>{anecdotes[maxVote]}</div>
      <div>Votes: {votes[maxVote]}</div>
    </>
  );
};

export default App;
