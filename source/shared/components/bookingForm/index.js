import React from 'react';
import { connect } from 'react-redux';

import DatTimeForm from 'shared/components/bookingForm/dateTimeForm'; 
import CustomerForm from 'shared/components/bookingForm/customerForm'; 
import LocationForm from 'shared/components/bookingForm/locationForm'; 
import ItemsForm from 'shared/components/bookingForm/itemsForm';
import CrewForm from 'shared/components/bookingForm/crewForm';
import ExtraInfoForm from 'shared/components/bookingForm/extraInfoForm';
import SubmitForm from 'shared/components/bookingForm/submitForm';
import BookingModal from 'shared/components/bookingForm/bookingModal';
import ValidateMessage from 'shared/components/bookingForm/validateMessage';
import {
    calculateDistance,
    changeInputValue,
    addItem,
    duplicateItem,
    editItem,
    deleteItem,
    addAccessory,
    editAccessory,
    deleteAccessory,
    getQuote,
    resetQuote,
    makeBooking,
    resetForm,
    showValidateError,
} from 'shared/modules/newBooking';
import { validateAll } from 'shared/components/bookingForm/validations';


class BookingForm extends React.Component {
    componentDidUpdate(prevProps) {
        const currProps = this.props;
        this.props.calculateDistance(currProps, prevProps);
        autoResetQuote(currProps, prevProps, this.props.resetQuote);
    }
    render() {
        const { newBooking, handleInputChange, addItem, duplicateItem, editItem, deleteItem, addAccessory, editAccessory, deleteAccessory, value, distance, items, accessories, status, defaultLocations, resetForm, bookedId, quote, resetQuote, getQuote, makeBooking, pricingModel } = this.props;
        return (
            <div>
                <DatTimeForm
                    handleInputChange={handleInputChange}
                    time={value.scheduleTime}
                    date={value.scheduleDate}
                    displayError={status.displayValidateError}
                />
                <CustomerForm
                    handleInputChange={handleInputChange}
                    firstName={value.firstName}
                    lastName={value.lastName}
                    email={value.email}
                    phone={value.phone}
                    displayError={status.displayValidateError}
                />
                <LocationForm
                    handleInputChange={handleInputChange}
                    pickUpLocation={value.pickUpLocation}
                    distance={distance}
                    defaultLocations={defaultLocations}
                    deliveryLocation={value.deliveryLocation}
                    deliveryLocationUnit={value.deliveryLocationUnit}
                    authorityToLeaveEnabled={pricingModel.authorityToLeaveEnabled}
                    authorityToLeave={value.authorityToLeave}
                    authorityToLeaveAccepted={value.authorityToLeaveAccepted}
                    specialAccessNote={value.specialAccessNote}
                    placeToLeave={value.placeToLeave}
                    status={status}
                    displayError={status.displayValidateError}
                />
                <ItemsForm
                    type="ITEMS"
                    addItem={addItem}
                    duplicateItem={duplicateItem}
                    editItem={editItem}
                    deleteItem={deleteItem}
                    items={items}
                    itemLimit={{ quantities: pricingModel.itemLimit, boxes: pricingModel.boxesLimit }}
                    displayError={status.displayValidateError}
                    volumeRequired={pricingModel.volumeRequired}
                />
                <ItemsForm
                    type="ACCESSORIES"
                    addItem={addAccessory}
                    editItem={editAccessory}
                    deleteItem={deleteAccessory}
                    items={accessories}
                    displayError={status.displayValidateError}
                    itemLimit={{ item: pricingModel.itemLimit, boxes: pricingModel.boxesLimit }}
                />
                { pricingModel.pickCrew &&
                    <CrewForm
                        handleInputChange={handleInputChange}
                        extraDriver={value.extraDriver}
                    />
                }
                <ExtraInfoForm
                    handleInputChange={handleInputChange}
                    invoiceNumber={value.invoiceNumber}
                    notes={value.notes}
                    displayError={status.displayValidateError}
                    invoiceRequired={pricingModel.invoiceRequired}
                />
                {status.displayValidateError &&
                    <ValidateMessage
                        newBooking={newBooking}
                        boxesLimit={pricingModel.boxesLimit}
                        volumeRequired={pricingModel.volumeRequired}
                    />
                }
                <SubmitForm
                    getQuote={() => getQuote(newBooking, pricingModel)}
                    makeBooking={() => makeBooking(newBooking)}
                    status={status}
                    quote={quote}
                />
                <BookingModal
                    resetQuote={resetQuote}
                    status={status}
                    resetForm={() => resetForm(defaultLocations, pricingModel)}
                    bookedId={bookedId}
                />
            </div>
        )
    }
};

export default connect(
    ({ newBooking, settings, user }) => ({
        newBooking,
        value: newBooking.value,
        distance: newBooking.distance,
        quote: newBooking.quote,
        items: newBooking.items,
        accessories: newBooking.accessories,
        status: newBooking.status,
        defaultLocations: settings.locations,
        pricingModel: settings.pricingModel,
        userId: user.user.id,
        bookedId: newBooking.bookedId,
    }),
    dispatch => ({
        handleInputChange: (value, name) => dispatch(changeInputValue(value, name)),
        editItem: (item, index) => dispatch(editItem(item, index)),
        deleteItem: index => dispatch(deleteItem(index)),
        addItem: () => dispatch(addItem()),
        duplicateItem: () => dispatch(duplicateItem()),
        editAccessory: (item, index) => dispatch(editAccessory(item, index)),
        deleteAccessory: index => dispatch(deleteAccessory(index)),
        addAccessory: () => dispatch(addAccessory()),
        makeBooking: newBooking => {
            dispatch(makeBooking(dispatch, newBooking));
        },
        getQuote: (newBooking, pricingModel) => {
            if (!validateAll(newBooking, pricingModel)) {
                dispatch(showValidateError());
                window.scrollTo(0, 0);
            } else {
                dispatch(getQuote(dispatch, newBooking));
            }
        },
        resetQuote: () => dispatch(resetQuote()),
        calculateDistance: (current, prev) => {
            if (
                (current.value.pickUpLocation !== '' || current.value.deliveryLocation !== '')
                &&
                (
                    current.value.scheduleDate !== prev.value.scheduleDate
                    ||
                    current.value.scheduleTime !== prev.value.scheduleTime
                    ||
                    current.value.pickUpLocation !== prev.value.pickUpLocation
                    ||
                    current.value.deliveryLocation !== prev.value.deliveryLocation
                )
            ) {
                dispatch(calculateDistance(
                    dispatch,
                    current.value.pickUpLocation,
                    current.value.deliveryLocation,
                    current.value.scheduleDate,
                    current.value.scheduleTime,
                ));
            }
        },
        resetForm: (locations, pricingModel) => {
            window.scrollTo(0, 0);
            dispatch(resetForm(locations, pricingModel));
        },
    }),
)(BookingForm);

const autoResetQuote = (currProps, prevProps, resetQuote) => {
    if(
        currProps.value !== prevProps.value
        ||
        currProps.items !== prevProps.items
        ||
        currProps.accessories !== prevProps.accessories
    ) {
        resetQuote();
    }
};