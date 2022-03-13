import { SET_AUTH } from "../contexts/constant";

export const authReducer = (state, action) => {
    const { type, payload: { isAuthenticated, user } } = action;
    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                authLoading:false,
                isAuthenticated,
                user

            }
        default: return state
    }
}