import * as ActionTypes from "./ActionTypes"

export const EventData = (state = {
    isLoading: true,
    errMess: null,
    role: null,
    data:{}
}, action) => {
    switch (action.type){
        case ActionTypes.ADD_EVENT_DATA:
            return {...state, errMess: null, isLoading: false, data: action.payload};

        case ActionTypes.EVENT_DATA_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.EVENT_DATA_LOADING:
            return {...state, isLoading: true, errMess: null, data: {}}

        case ActionTypes.SET_ROLE_IN_EVENT:
            return {...state, role: action.payload}

        default:
            return state
    }
}