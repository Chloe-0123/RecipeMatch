// redux actions: declare name of a certain action 
export const toggleComponent = () => ({
    type: 'TOGGLE_COMPONENT',
  });
  
  // redux reducers: declare what actions do
  const initialState = {
    showComponent1: true,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_COMPONENT':
        return {
          ...state,
          showComponent1: !state.showComponent1,
        };
      default:
        return state;
    }
  };
  
export default reducer;
  