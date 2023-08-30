// keys for actiontypes
export const ActionTypes = {
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
};

// Update password
export function updatePassword(password) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.UPDATE_PASSWORD, payload: password });
  };
}
