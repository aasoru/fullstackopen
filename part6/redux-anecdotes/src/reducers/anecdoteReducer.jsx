import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      state.push(action.payload);
    },
    vote(state, action) {
      const updatedAnecdote = action.payload;
      const index = state.findIndex((a) => a.id === updatedAnecdote.id);
      state[index] = updatedAnecdote;
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

const { createAnecdote, setAnecdotes, vote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToVote = getState().anecdotes.find((a) => a.id === id);

    const updatedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    };

    const returnedAnecdote = await anecdotesService.update(updatedAnecdote);

    dispatch(vote(returnedAnecdote));
  };
};

export default anecdoteSlice.reducer;
