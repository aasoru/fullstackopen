import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotificationMessage: (state, action) => action.payload,
    clearNotification: () => "",
  },
});

let timeoutId;

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch(setNotificationMessage(message));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export const { setNotificationMessage, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
