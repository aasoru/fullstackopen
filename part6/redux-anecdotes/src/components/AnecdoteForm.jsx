import { useDispatch } from "react-redux";

import { appendAnecdote } from "../reducers/anecdoteReducer";

import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = "";
    dispatch(appendAnecdote(content));

    dispatch(setNotification(`You created "${content}"`, 5));
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
