// keys for actiontypes
export const ActionTypes = {
  UPDATE_USER: 'UPDATE_USER',
  GET_USER: 'GET_USER',
};

export function updateUser(body) {
  return {
    type: ActionTypes.UPDATE_USER,
    payload: body,
  };
}

export function getUser() {
  return {
    type: ActionTypes.GET_USER,
    payload: null,
  };
}
