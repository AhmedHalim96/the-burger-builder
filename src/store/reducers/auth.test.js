import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth Reducer', () => {
    it('should Return intialState', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
    it('should store Token upon Login', () => {
        expect(reducer({
                token: null,
                userId: null,
                error: null,
                loading: false,
                authRedirectPath: '/'}, 
                {type: actionTypes.AUTH_SUCCESS,
                    idToken: "someToken",
                    userId:"someUserId"              
                })).toEqual({
                    token: "someToken",
                    userId: "someUserId",
                    error: null,
                    loading: false,
                    authRedirectPath: '/'
                });
    });
});

