import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const logout = expirationTime =>{
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expirationTime)
    }
}

export const auth = (email, password, isSignUp, history) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let mode = '';
        isSignUp ? mode = 'signupNewUser' : mode='verifyPassword'

        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/'+ mode +'?key=AIzaSyB9memgoBkc8MxqDttzBEpKYYEcEZWoBq4', authData)
            .then(res => {
                // console.log(res);
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId );
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(logout(res.data.expiresIn*1000))
            })
            // .then(
            //     history.push('/')
            // )
            .catch(err => {
                console.log(err.response);

                dispatch(authFailed(err.response.data.error));
            } )
        
    }
}
export const authRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout())
            } else {
                const time = expirationDate.getTime() - new Date().getTime();
                dispatch(authSuccess(token, userId));
                dispatch(logout(time)); 
            } 
        }
    }
}

