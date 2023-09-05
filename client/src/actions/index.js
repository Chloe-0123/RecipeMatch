
export const addIngredient = (text) => {
    return {
        type: "addIngredient",
        payload: {
            text: text 
        }
    }
}

export const deleteIngredient = (text) => {
    return {
        type: 'deleteIngredient',
        payload: text,
    }
}