import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filter);

  const anecdotes = useSelector((state) => {
    const allAnecdotes = state.anecdotes || state;
    return [...allAnecdotes]
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase()),
      )
      .sort((a, b) => b.votes - a.votes);
  });

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(voteAnecdote(anecdote.id));
                dispatch(
                  setNotification(`you voted '${anecdote.content}'`, 10),
                );
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
