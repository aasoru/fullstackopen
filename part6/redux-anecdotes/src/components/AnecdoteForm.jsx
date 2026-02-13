import { useDispatch } from "react-redux";

import { createAnecdote } from "../reducers/anecdoteReducer";

import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

import anecdotesService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = "";

    const newAnecdote = await anecdotesService.createNew(content);
    dispatch(createAnecdote(newAnecdote));

    dispatch(setNotification(`You created "${content}"`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>

      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
