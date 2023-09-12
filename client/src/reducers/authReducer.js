const initialState = { logged : false}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN' :
            return {
                ...state,
                logged: [...state.logged, action.payload]
            }
        default:
            return state;
    }
}