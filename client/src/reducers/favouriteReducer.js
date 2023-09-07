
const initialState = {
    savedRecipes: []
}

export const favouriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'addToSaved':
            return {
                ...state,
                savedRecipes: [...state.savedRecipes, action.payload]
            }
        case 'deleteFromSaved':
            return {
                ...state,
                savedRecipes: state.savedRecipes.filter( rec => rec.title !== action.payload)
            }
        default:
            return state
    }

}