import { useState } from "react";

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
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const mostVoted = Math.max(...votes);
  const bestIndex = votes.indexOf(mostVoted);

  return (
    <>
      <Title>Anecdote of the day</Title>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button
        onClick={() => {
          const copyVotes = [...votes];
          copyVotes[selected] += 1;
          setVotes(copyVotes);
        }}
      >
        vote
      </Button>
      <Button
        onClick={() => {
          const randomNumber = Math.floor(Math.random() * anecdotes.length);
          setSelected(randomNumber);
        }}
      >
        next anecdote
      </Button>

      <Title>Anecdote with most votes</Title>
      <div>{anecdotes[bestIndex]}</div>
      <div>has {mostVoted} votes</div>
    </>
  );
};

const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

const Title = ({ children }) => (
  <h1>
    <strong>{children}</strong>
  </h1>
);

export default App;
