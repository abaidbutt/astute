const initState = {
    Users: [],
  };
  const Users = (state = initState, action) => {
    switch (action.type) {
      case 'INITIAL_USERS':
        state = {
          ...state,
          Users: action.payload,
        };
        break;
  
    } 
    return state;
  };
  export default Users;
  