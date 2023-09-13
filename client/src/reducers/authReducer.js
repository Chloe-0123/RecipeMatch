const initialState = { userEmail : ''}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN' :
            return {
                ...state,
                userEmail: [...state.userEmail, action.payload]
            }
        case 'LOGOUT' :
            return {
                ...state,
                userEmail: ''
            }
        default:
            return state;
    }
}