import Ajax from 'client/ajax'

// action types
const LOAD_BOOKINGS = 'LOAD_BOOKINGS';
const LOAD_BOOKINGS_SUCCESS = 'LOAD_BOOKINGS_SUCCESS';
const LOAD_BOOKINGS_FAILURE = 'LOAD_BOOKINGS_FAILURE';
const LOAD_HISTORY = 'LOAD_HISTORY';
const LOAD_HISTORY_SUCCESS = 'LOAD_HISTORY_SUCCESS';
const CHANGE_LOCATION_FILTER = 'CHANGE_LOCATION_FILTER';

// actions
const loadBookingsSuccess = data => ({ type: LOAD_BOOKINGS_SUCCESS, payload: data });
const loadBookingsFailure = error => ({ type: LOAD_BOOKINGS_FAILURE, error });
const loadHistorySuccess = data => ({ type: LOAD_HISTORY_SUCCESS, payload: data });
export const changeLocationFilter = address => ({ type: CHANGE_LOCATION_FILTER, address });
// actions with side effect
export const loadBookings = dispatch => {
    let token = typeof(localStorage) !== 'undefined' ? localStorage.getItem('jwtTokenBusiness') : null;
    Ajax.get(`/api/business/dashboard`, token)
        .then(response => {
        dispatch(loadBookingsSuccess(JSON.parse(response.data)))
        })
        .catch(reasons => {
        dispatch(loadBookingsFailure(reasons))
        });
    return { type: LOAD_BOOKINGS };
}

export const loadHistory = dispatch => {
    let token = typeof(localStorage) !== 'undefined' ? localStorage.getItem('jwtTokenBusiness') : null;
    Ajax.get('/api/business/history', token)
        .then(response => {
            dispatch(loadHistorySuccess(JSON.parse(response.data)))
        })
        .catch(reasons => {
            dispatch(loadBookingsFailure(reasons))
        });
    return { type: LOAD_HISTORY };
}

// initial state
const INITIAL_STATE = {
    upcoming: [],
    today: [],
    tomorrow: [],
    history: [],
    loading: false,
    error: null,
    stats: {
        completedThisMonth: 0,
        deliveriesToday: 0,
        totalUpcoming: 0,
    },
    locationFilter: 'ALL',
}

// reducer
export const bookings = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_LOCATION_FILTER:
            return { ...state, locationFilter: action.address };
        case LOAD_BOOKINGS:
            return { ...state, loading: true, error: null };
        case LOAD_HISTORY:
            return { ...state, loading: true, error: null };
        case LOAD_HISTORY_SUCCESS:
            return {
                ...state,
                stats: action.payload.stats,
                loading: false,
                error: null,
                upcoming: action.payload.deliveries,
                history: action.payload.deliveryHistory,
            }
        case LOAD_BOOKINGS_SUCCESS:
            return {
                ...state,
                stats: action.payload.stats,
                upcoming: action.payload.deliveries,
                loading: false,
                error: null
            }
        case LOAD_BOOKINGS_FAILURE:
            return { ...INITIAL_STATE, error: action.error };
        default:
        return state;
    }
}