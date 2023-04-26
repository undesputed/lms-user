import { AUTH, LOGOUT } from 'src/actions/constants';

const initialState = {
  isLoggedIn: false,
  token: '',
  data: {
    token: ''
  }
};

const authReducer = (action: any, state = initialState) => {
  switch (action?.type) {
    case 'AUTH':
      if (localStorage.length !== 0) {
        localStorage.clear();
        localStorage.setItem('profile', JSON.stringify({ ...state?.data }));
      }
      localStorage.setItem('profile', JSON.stringify({ ...state?.data }));
      console.log(state.data.token);
      return {
        ...state,
        isLoggedIn: true,
        token: state.data.token
      };
    case 'GOOGLEAUTH':
      if (localStorage.length !== 0) {
        localStorage.clear();
        localStorage.setItem('profile', JSON.stringify({ ...state?.data }));
      }
      localStorage.setItem('profile', JSON.stringify({ ...state?.data }));
      return {
        ...state,
        isLoggedIn: true,
        token: state.data.token
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        token: ''
      };
    default:
      return state;
  }
};

export default authReducer;
