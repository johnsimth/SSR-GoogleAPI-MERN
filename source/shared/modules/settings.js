const SET_SETTINGS = 'SET_SETTINGS';
const ADD_LOCATION = 'ADD_LOCATION';
const DELETE_LOCATION = 'DELETE_LOCATION';

export const setSettings = settings => ({ type: SET_SETTINGS, settings });
export const addLocation = location => ({ type: ADD_LOCATION, location });
export const deleteLocation = id => ({ type: DELETE_LOCATION, id });

const INITIAL_STATE = {
    locations: [],
    pricingModel: {
        pickCrew: true,
        defaultCrew: 2,
        invoiceRequired: true,
        authorityToLeaveEnabled: true,
        itemLimit: 20,
        boxesLimit: -1,
        volumeRequired: false,
    },
};

export const settings = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SETTINGS:
            // TODO: refactor: I leave some code to override pricing model for testing purpose.
            return {
                ...state,
                ...action.settings,
                pricingModel: {
                    ...action.settings.pricingModel,
                    // boxesLimit: 10,
                },
            }
        case ADD_LOCATION:
            return {
                ...state,
                locations: [ ...state.locations, action.location ],
            }
        case DELETE_LOCATION:
            return {
                ...state,
                locations: state.locations.filter(location => Number(location.id) !== Number(action.id)),
            }
        default:
            return state
    }
};