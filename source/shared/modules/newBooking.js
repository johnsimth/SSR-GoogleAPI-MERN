import moment from 'moment-timezone';
import Ajax from 'client/ajax';

// type
const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
const ADD_ITEM = 'ADD_ITEM';
const DUPLICATE_ITEM = 'DUPLICATE_ITEM';
const EDIT_ITEM = 'EDIT_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const ADD_ACCESSORY = 'ADD_ACCESSORY';
const EDIT_ACCESSORY = 'EDIT_ACCESSORY';
const DELETE_ACCESSORY = 'DELETE_ACCESSORY';
const CALCULATE_DISTANCE = 'CALCULATE_DISTANCE';
const CALCULATE_DISTANCE_SUCCESS = 'CALCULATE_DISTANCE_SUCCESS';
const CALCULATE_DISTANCE_FAILURE = 'CALCULATE_DISTANCE_FAILURE';
const GET_QUOTE = 'GET_QUOTE';
const GET_QUOTE_SUCCESS = 'GET_QUOTE_SUCCESS';
const GET_QUOTE_FAILURE = 'GET_QUOTE_FAILURE';
const RESET_QUOTE = 'RESET_QUOTE';
const MAKE_BOOKING = 'MAKE_BOOKING';
const MAKE_BOOKING_SUCCESS = 'MAKE_BOOKING_SUCCESS';
const MAKE_BOOKING_FAILURE = 'MAKE_BOOKING_FAILURE';
const RESET_FORM = 'RESET_FORM';
const SHOW_VALIDATE_ERROR = 'SHOW_VALIDATE_ERROR';

// action
export const changeInputValue = (value, name) => ({
    type: CHANGE_INPUT_VALUE,
    name,
    value,
});
export const addItem = () => ({ type: ADD_ITEM });
export const duplicateItem = () => ({ type: DUPLICATE_ITEM });
export const editItem = (item, index) => ({ type: EDIT_ITEM, item, index });
export const deleteItem = index => ({ type: DELETE_ITEM, index });
export const addAccessory = () => ({ type: ADD_ACCESSORY });
export const editAccessory = (item, index) => ({ type: EDIT_ACCESSORY, item, index });
export const deleteAccessory = index => ({ type: DELETE_ACCESSORY, index });
export const resetQuote = () => ({ type: RESET_QUOTE });
export const showValidateError = () => ({ type: SHOW_VALIDATE_ERROR });
const calculateDistanceSuccess = data => ({
    distance: data.distance,
    type: CALCULATE_DISTANCE_SUCCESS,
});
const calculateDistanceFailure = () => ({ type: CALCULATE_DISTANCE_FAILURE });
const getQuoteSuccess = d => ({ quote: d.toCapture, type: GET_QUOTE_SUCCESS });
const getQuoteFailure = () => ({ type: GET_QUOTE_FAILURE });
const makeBookingSuccess = d => ({ id: d.id, type: MAKE_BOOKING_SUCCESS });
const makeBookingFailure = () => ({ type: MAKE_BOOKING_FAILURE });
export const resetForm = (locations, pricingModel) => {
    let pickUpLocation = '';
    let pickUpLocationName = '';
    if (locations.length) {
        pickUpLocation = locations[0].address;
        pickUpLocationName = locations[0].storeName;
    }
    return ({
        type: RESET_FORM,
        pickUpLocation,
        pickUpLocationName,
        extraDriver: pricingModel.defaultCrew !== 2 ? false : true,
    });
};

// action with side effect
export const calculateDistance = (
    dispatch,
    pickUpLocation,
    deliveryLocation,
    scheduleDate,
    scheduleTime
) => {
    Ajax.post('/api/client/calculate/travel', {
        pickUpLocation,
        deliveryLocation,
        scheduleDate,
        scheduleTime,
    }).then(response => {
        dispatch(calculateDistanceSuccess(JSON.parse(response.data)));
    }).catch(() => dispatch(calculateDistanceFailure()));
    return { type: CALCULATE_DISTANCE };
}


export const getQuote = (dispatch, state) => {
    let token = typeof(localStorage) !== 'undefined' ? localStorage.getItem('jwtTokenBusiness') : null;
    Ajax.post('/api/client/calculate/quote', pickDataForGetQuote(state), token)
        .then(response => {
            dispatch(getQuoteSuccess(JSON.parse(response.data)));
        }).catch(reasons => {
            console.log(reasons);
            dispatch(getQuoteFailure());
        });
    return { type: GET_QUOTE };
};

export const makeBooking = (dispatch, state) => {
    let token = null;
    if (typeof(localStorage) !== 'undefined') token = localStorage.getItem('jwtTokenBusiness');
    Ajax.post('/api/client/book', pickDataForMakeBooking(state), token)
        .then(response => {
            console.log(response);
            dispatch(makeBookingSuccess(JSON.parse(response.data)));
        })
        .catch(reasons => {
            let data = JSON.parse(reasons.data);
            console.log(data.error);
            dispatch(makeBookingFailure(data.error));
        })
    return { type: MAKE_BOOKING };
};

// initial state
const DEFAULT_ITEM = { quantity: 1, boxes: 1, description: 'test', volume: 0, weight: 0 };
const DEFAULT_ACCESSORY = { quantity: 1, boxes: 1, description: '', volume: 0, weight: 0 };
const DEFAULT_DATE = moment().tz('Pacific/Auckland').add(1, 'days');
const DEFAULT_TIME = 'anytime';
const INITIAL_STATE = {
    value: {
        scheduleDate: DEFAULT_DATE,
        scheduleTime: DEFAULT_TIME,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        deliveryLocation: '',
        deliveryLocationUnit: '',
        pickUpLocation: '',
        pickUpLocationName: '',
        authorityToLeave: false,
        placeToLeave: 'frontDoor',
        authorityToLeaveAccepted: false,
        specialAccessNote: '',
        extraDriver: true,
        notes: '',
        invoiceNumber: '',
    },
    items: [DEFAULT_ITEM],
    accessories: [],
    distance: 0,
    quote: 45,
    bookedId: null,
    status: {
        loadingDistance: false,
        distanceError: false,
        displayValidateError: false,
        loadingQuote: false,
        loadQuote: false,
        requestingBooking: false,
        booked: false,
    },
};

// reducer
export const newBooking = (state = INITIAL_STATE, action) => {
    console.log(`action:`); // TODO: remove console.log
    console.log(action);
    switch(action.type) {
        case CHANGE_INPUT_VALUE:
            return {
                ...state,
                value: {
                    ...state.value,
                    [action.name]: action.value,
                }
            };
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, DEFAULT_ITEM],
            }
        case DUPLICATE_ITEM:
            return {
                ...state,
                items: [...state.items, state.items[state.items.length-1]],
            }
        case EDIT_ITEM:
            return {
                ...state,
                items: state.items.map((item, index) => {
                if (index === action.index) return action.item;
                    return item;
                }),
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter((item, index) => index !== action.index),
            }
        case ADD_ACCESSORY:
            return {
                ...state,
                accessories: [...state.accessories, DEFAULT_ACCESSORY],
            }
        case EDIT_ACCESSORY:
            return {
                ...state,
                accessories: state.accessories.map((item, index) => {
                if (index === action.index) return action.item;
                    return item;
                }),
            }
        case DELETE_ACCESSORY:
            return {
                ...state,
                accessories: state.accessories.filter((item, index) => index !== action.index),
            }
        case CALCULATE_DISTANCE:
            return {
                ...state,
                distance: 0,
                status: { ...state.status, loadingDistance: true, distanceError: false },
            }
        case CALCULATE_DISTANCE_FAILURE:
            return {
                ...state,
                distance: 0,
                status: { ...state.status, loadingDistance: false, distanceError: true }
            }
        case CALCULATE_DISTANCE_SUCCESS:
            return {
                ...state,
                distance: action.distance,
                status: { ...state.status, loadingDistance: false, distanceError: false }
            }
        case GET_QUOTE:
            return {
                ...state,
                quote: 45,
                status: { ...state.status, loadingQuote: true, loadQuote: false },
            }
        case GET_QUOTE_SUCCESS:
            return {
                ...state,
                quote: action.quote,
                status: { ...state.status, loadingQuote: false, loadQuote: true },
            }
        case GET_QUOTE_FAILURE:
            return {
                ...state,
                status: { ...state.status, loadingQuote: false, loadQuote: false },
            }
        case RESET_QUOTE:
            return {
                ...state,
                quote: 45,
                status: { ...state.status, loadingQuote: false, loadQuote: false },
            }
        case MAKE_BOOKING:
            return {
                ...state,
                status: { ...state.status, requestingBooking: true },
            }
        case MAKE_BOOKING_SUCCESS:
            return {
                ...state,
                bookedId: action.id,
                status: { ...state.status, requestingBooking: false, booked: true },
            }
        case MAKE_BOOKING_FAILURE:
            return {
                ...state,
                status: { ...state.status, requestingBooking: false },
            }
        case SHOW_VALIDATE_ERROR:
            return {
                ...state,
                status: { ...state.status, displayValidateError: true }
            }
        case RESET_FORM:
            return {
                ...INITIAL_STATE,
                value: {
                    ...INITIAL_STATE.value,
                    pickUpLocation: action.pickUpLocation,
                    pickUpLocationName: action.pickUpLocationName,
                    extraDriver: action.extraDriver,
                }
            }
        default: return state;
    };
};

const pickDataForMakeBooking = newBooking => {
    const { value, accessories, distance, items, quote } = newBooking;
    return {
        ...value,
        scheduleDate: value.scheduleDate.format(),
        items,
        accessories,
        distance,
        locations: [
            {
                address: value.pickUpLocation,
                type: 'pick-up',
                floors: 0, // TODO: florrs, accessDistance, elevator should be from settings.locations. Im not sure whats happen when user select other location.
                accessDistance: 0,
                elevator: false,
                itineraryOrder: 1,
                locationName: value.pickUpLocationName
            },
            {
                address: value.deliveryLocation,
                type: 'drop-off',
                floors: 0,
                accessDistance: 0,
                elevator: false,
                itineraryOrder: 2,
                unit: value.deliveryLocationUnit,
            },
        ],
        quote,
        platform: 'business',
    }
};

const pickDataForGetQuote = newBooking => {
    const { value, distance, items, accessories } = newBooking;
    return {
        scheduleDate: value.scheduleDate.format(),
        scheduleTime: value.scheduleTime,
        items,
        accessories,
        distance,
        extraDriver: value.extraDriver,
        locations: [
            {
                address: value.pickUpLocation,
                type: 'pick-up',
                floors: 0, // TODO: florrs, accessDistance, elevator should be from settings.locations. Im not sure whats happen when user select other location.
                accessDistance: 0,
                elevator: false,
                itineraryOrder: 1
            },
            {
                address: value.deliveryLocation,
                type: 'drop-off',
                floors: 0,
                accessDistance: 0,
                elevator: false,
                itineraryOrder: 2
            },
        ],
        platform: 'business',
    }
};