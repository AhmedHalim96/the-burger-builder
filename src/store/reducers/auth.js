import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'


const intialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state=intialState, action) => {
    switch (action.type){
        case actionTypes.AUTH_START:
            return updateObject(state, {loading: true, error: null});
        case actionTypes.AUTH_FAIL:
            return updateObject(state, {loading: false, error: action.error});
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {loading: false, userId: action.userId,  token: action.idToken, error:null});
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, {token: null, userId: null})
        case actionTypes.AUTH_REDIRECT_PATH:
            return updateObject(state, {authRedirectPath: action.path})
            
        default:
            return state

    }
}

export default reducer