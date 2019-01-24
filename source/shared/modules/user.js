import Ajax from 'client/ajax';
import { setSettings } from 'shared/modules/settings';
import { resetForm } from 'shared/modules/newBooking';

// action types
const ME_FROM_TOKEN = 'ME_FROM_TOKEN'; //Get current user(me) from token in localStorage
const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
const RESET_TOKEN = 'RESET_TOKEN';
const SIGNUP_USER = 'SIGNUP_USER';
const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';
const SIGNIN_USER = 'SIGNIN_USER';
const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';
const LOGOUT_USER = 'LOGOUT_USER';

// action
const meFromTokenSuccess = user => ({ type: ME_FROM_TOKEN_SUCCESS, payload: user });
const meFromTokenFailure = error => ({ type: ME_FROM_TOKEN_FAILURE, payload: error });
const signUpUserFailure = error => ({ type: SIGNUP_USER_FAILURE, payload: error });
export const resetToken = () => ({ type: RESET_TOKEN }); // TODO: not using anywhere. check difference with logout()
const signInUserSuccess = user => ({ type: SIGNIN_USER_SUCCESS, payload: user });
const signInUserFailure = error => ({ type: SIGNIN_USER_FAILURE, payload: error });
export const logoutUser = () => ({ type: LOGOUT_USER });

// action with side effect
export const meFromToken = (dispatch, token) => {
  //check if the token is still valid, if so, get me from the server
  Ajax.get('/api/user/recover', token)
    .then(response => {
      let data = JSON.parse(response.data)
      dispatch(meFromTokenSuccess(data))
      dispatch(setSettings(data.settings))
      dispatch(resetForm(data.settings.locations, data.settings.pricingModel));
    })
    .catch(reasons => {
      dispatch(meFromTokenFailure(reasons))
    })
  return { type: ME_FROM_TOKEN }
}

export const signUpUser = (dispatch, formValues) => {
  Ajax.post('/api/user/business/signup', formValues)
    .then(response => {
      dispatch(signInUser(dispatch, { email: JSON.parse(response.data).email, password: formValues.password }))
    })
    .catch(reasons => {
      dispatch(signUpUserFailure(reasons))
    })
  return { type: SIGNUP_USER }
}


export const signInUser = (dispatch, formValues) => {
  Ajax.post('/api/user/signin', formValues)
    .then(response => {
      let data = JSON.parse(response.data)
      dispatch(signInUserSuccess(data))
      dispatch(setSettings(data.settings))
      dispatch(resetForm(data.settings.locations, data.settings.pricingModel));
    })
    .catch(reasons => {
      dispatch(signInUserFailure(reasons))
    })
  return { type: SIGNIN_USER };
}

// user = userobj,
// status can be:
// 1. 'storage' ie. localstorage / sessionstorage)
// 2. 'signup' (signing up)
// 3. 'signin' (signing in)
// 4. 'validate'(validate fields)
// 5. 'validate_email' (validating email token)
// 5. 'authenticated'(after signin)
// 6. 'logout' (after logout)

const INITIAL_STATE = { user: {}, status: null, error: null, loading: false, done: false, isFurnitureNow: false, isDoubleStar: false, isHarveyNorman: false }

export const user = (state = INITIAL_STATE, action) => {
    let error, furnitureNow, harveyNorman, doubleStar
    switch(action.type) {

    case ME_FROM_TOKEN:// loading currentUser("me") from jwttoken in local/session storage storage,
        return { ...state, user: null, status: 'storage', error: null, loading: true}

    case ME_FROM_TOKEN_SUCCESS:// return user, status = authenticated and make loading = false
        localStorage.setItem('jwtTokenBusiness', action.payload.token)
        furnitureNow = action.payload.user.id === 127 || action.payload.user.id === 132 || action.payload.user.id === 133 || action.payload.user.id === 135 || action.payload.user.id === 136
        doubleStar = action.payload.user.id === 8
        harveyNorman = action.payload.user.id === 130
        return { ...state, user: action.payload.user, status: 'authenticated', error: null, loading: false, isFurnitureNow: furnitureNow, isDoubleStar: doubleStar, isHarveyNorman: harveyNorman} //<-- authenticated

    case ME_FROM_TOKEN_FAILURE:// return error and make loading = false
        localStorage.removeItem('jwtTokenBusiness')//remove token from storage
        error = action.payload.data || { message: action.payload.message }//2nd one is network or server down errors
        return { ...state, user: null, status: 'storage', error: error, loading: false}

    case RESET_TOKEN:// remove token from storage make loading = false
        return { ...state, user: null, status: 'storage', error: null, loading: false}

    case SIGNUP_USER:// sign up user, set loading = true and status = signup
        return { ...state, user: null, status: 'signup', error: null, loading: true}

    case SIGNUP_USER_SUCCESS://return user, status = authenticated and make loading = false
        localStorage.setItem('jwtTokenBusiness', action.payload.token)
        return { ...state, user: action.payload.user, status: 'authenticated', error: null, loading: false} //<-- authenticated

    case SIGNUP_USER_FAILURE:// return error and make loading = false
        error = action.payload.data || { message: action.payload.message }//2nd one is network or server down errors
        return { ...state, user: null, status: 'signup', error: error, loading: false}

    case SIGNIN_USER:// sign in user,  set loading = true and status = signin
        return { ...state, user: null, status: 'signin', error:null, loading: true}

    case SIGNIN_USER_SUCCESS://return authenticated user,  make loading = false and status = authenticated
       localStorage.setItem('jwtTokenBusiness', action.payload.token);
       furnitureNow = action.payload.user.id === 127 || action.payload.user.id === 132 || action.payload.user.id === 133 || action.payload.user.id === 135 || action.payload.user.id === 136
       doubleStar = action.payload.user.id === 8
       harveyNorman = action.payload.user.id === 130
       return { ...state, user: action.payload.user, status: 'authenticated', error: null, loading: false, isFurnitureNow: furnitureNow, isDoubleStar: doubleStar, isHarveyNorman: harveyNorman} //<-- authenticated

    case SIGNIN_USER_FAILURE:// return error and make loading = false
        error = action.payload.data || { message: action.payload.message }//2nd one is network or server down errors
        return { ...state, user: null, status: 'signin', error: error, loading: false}

    case LOGOUT_USER:
        localStorage.removeItem('jwtTokenBusiness')
        return {...state, user:null, status: 'logout', error: null, loading: false}
    default:
        return state
    }
}
