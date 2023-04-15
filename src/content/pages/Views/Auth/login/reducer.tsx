import {Action, State} from './types.d';

export const reducer = (state: State, action: Action): State => {
    switch(action.type){
        case 'setUsername':
            return{
                ...state,
                username: action.payload
            };
        case 'setPassword':
            return{
                ...state,
                password: action.payload
            };
        case 'setIsButtonDisabled':
            return{
                ...state,
                isButtonDisabled: action.payload
            };
        case 'loginSuccess':
            return{
                ...state,
                helperText: action.payload,
                isError: false
            };
        case 'loginFailed':
            return{
                ...state,
                helperText: action.payload,
                isError: true
            }
        case 'setIsError':
            return {
                ...state,
                isError: action.payload
            };
    }
}