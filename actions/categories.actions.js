export const deleteUser = ({ users, id }) => {
    return async (dispatch) => {
      const newData = users.filter((item) => item._id !== id);
      return dispatch({ type: "INITIAL_USERS", payload: newData });
    };
  };
  export const updateItem = (data, id, post, type) => {
    const newData = data.map(item => (item._id === id ? post : item))
    return ({ type, payload: newData})
}  