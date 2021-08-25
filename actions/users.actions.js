export const deleteUser = ({ users, id }) => {
  return async (dispatch) => {
    const newData = users.filter((item) => item._id !== id);
    return dispatch({ type: "INITIAL_USERS", payload: newData });
  };
};
 