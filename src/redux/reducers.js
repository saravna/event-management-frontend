import { USER_SIGNED_IN, SET_USER } from './action-types'

const initialState = {
    signedIn : false,
    user : null,
    a:null
}

function reducer(state = initialState, action){
    console.log(state)
    switch(action.type){
        case USER_SIGNED_IN: return {
            ...state,
            signedIn : action.payload,
        }
        case SET_USER : 
        console.log({
            ...state,
            user : action.payload,
        }) 
        return {
            ...state,
            user : action.payload,
        }
        default: return state
    }
}

export default reducer