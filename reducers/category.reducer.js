const initState = {
  Categories: [],
};
const Categories = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORIES':
      state = {
        ...state,
        Categories: action.payload,
      };
      break;
  }
  return state;
}; 
export default Categories;
