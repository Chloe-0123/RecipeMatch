
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

export const addToSaved = (title) => {
    return {
        type: 'addToSaved',
        payload: {
            title: title,
        }
    }
}

export const deleteFromSaved = (title) => {
    return {
        type: 'deleteFromSaved',
        payload: title
    }
}

export const LOGIN = (userEmail) => {
    return {
        type: 'LOGIN',
        payload: userEmail
    }
}

export const LOGOUT = () => {
    return {
        type: 'LOGOUT'
    }
}