
const initialState = {
    ingredientsList: []
}

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addIngredient':
      return {
          ...state,
          ingredientsList: [...state.ingredientsList, action.payload]
      }
    case 'deleteIngredient' :
      return {
        ...state,
        ingredientsList: state.ingredientsList.filter( ing => ing.text !== action.payload)
      }
    default:
    return state;
  }
}
