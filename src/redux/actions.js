import { 
    USER_SIGNED_IN, SET_USER
} from './action-types'

export const toggleSignedIn = (value) => {
    return { type : USER_SIGNED_IN, payload : value
    }
}

export const setCurrentUser = (value) => {
    return {
        type : SET_USER,
        payload : value
    }
}