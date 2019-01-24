import { combineReducers } from 'redux';
import { user } from 'shared/modules/user';
import { bookings } from 'shared/modules/bookings';
import { settings } from 'shared/modules/settings';
import { newBooking } from 'shared/modules/newBooking';

const rootReducer = combineReducers({
    user,
    bookings,
    settings,
    newBooking,
})

export default rootReducer
